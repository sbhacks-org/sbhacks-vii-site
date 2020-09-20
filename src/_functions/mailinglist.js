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
    const params = paramsSchema.parse(qs.parse(body));

    await api.put("/mail/subscribe", params);

    return {
      statusCode: 302,
      headers: {
        Location: "/",
      },
    };
  }

  return {
    statusCode: 400,
  };
};
