import { HandlerContext } from "$fresh/server.ts";
import { envConfig } from "../../util/config.ts";

const getUploadUrl = async () => {
  const formData = new FormData();
  formData.append("requireSignedURLs", "true");
  formData.append("metadata", '{"key":"value"}');

  const body = formData;

  const result = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${envConfig.CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${envConfig.CF_AUTH_TOKEN}`,
      },
      body,
    },
  );

  if (!result.ok) {
    throw new Error("");
  }

  const resultJson = await result.json();

  if (!resultJson.result.uploadURL || !resultJson.result.uploadURL) {
    throw new Error("");
  }

  return resultJson.result.uploadURL;
};

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const url = await getUploadUrl();

  return Response.json({ url });
};
