const qs = require("qs");
const z = require("zod");
const axios = require("axios");
const { fnt, get } = require("fntstring");

const htmlResponse = fnt`
<p>${get()}</p>
<p>
  <a href="/">Back to SB Hacks</a>
</p>
`;

function response(type, message) {
  if (type === "html") {
    return htmlResponse(message);
  }

  return JSON.stringify({ message });
}

const api = axios.create({
  baseURL: process.env.API_URL,
});

const paramsSchema = z.object({
  email: z.string().email(),
});

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  const contentType = event.headers["content-type"].toLowerCase();
  const body = event.body;

  const type = contentType === "application/x-www-form-urlencoded" ? "html" : "json"

  const userParams =
    contentType === "application/x-www-form-urlencoded"
      ? qs.parse(body)
      : contentType === "application/json"
      ? JSON.parse(body)
      : {};

  if (method === "POST") {
    let params;
    try {
      params = paramsSchema.parse(userParams);
    } catch {
      return {
        statusCode: 422,
        body: response(type, "Your request could not be processed."),
      };
    }

    const { data } = await api.put("/mail/subscribe", params);

    return {
      statusCode: 200,
      body: response(type, data.message),
    };
  }

  return {
    statusCode: 400,
  };
};
