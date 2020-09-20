const qs = require("qs");
const z = require("zod");
const axios = require("axios");

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
        statusCode: 302,
        headers: {
          Location: "/error"
        }
      }
    }

    const { data } = await api.put("/mail/subscribe", params);

    const url =
      data.message === "Already added to the mailing list!"
        ? "/duplicate"
        : "/success";

    return {
      statusCode: 302,
      headers: {
        Location: url,
      },
    };
  }

  return {
    statusCode: 400,
  };
};
