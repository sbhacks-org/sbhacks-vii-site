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

  if (
    method === "POST" &&
    contentType === "application/x-www-form-urlencoded"
  ) {
    let params;
    try {
      params = paramsSchema.parse(qs.parse(body));
    } catch {
      return {
        statusCode: 422,
        body: htmlResponse("Your request could not be processed."),
      };
    }

    const { data } = await api.put("/mail/subscribe", params);

    return {
      statusCode: 200,
      body: htmlResponse(data.message),
    };
  }

  return {
    statusCode: 400,
  };
};
