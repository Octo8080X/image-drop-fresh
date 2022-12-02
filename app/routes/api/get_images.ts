import { HandlerContext } from "$fresh/server.ts";
import { generateSignedUrl } from "../../util/cloudflare-images.ts";
import { envConfig } from "../../util/config.ts";
import { hash } from "huid/mod.ts";
export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const urlSearchParams = new URLSearchParams(new URL(req.url).search);
  const imageType = urlSearchParams.get("type");

  if (!imageType) {
    throw new Error("Reqire query 'type='");
  }

  const result = await fetch(
    `${envConfig.SUPABASE_EDGE_FUNCTION_END_POINT}/images`,
    {
      headers: {
        Authorization: `Bearer ${envConfig.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await result.json();

  const signedImageUrls = await Promise.all(
    data.images.map(async (i: { id: number; object_id: string }) => {
      return {
        url: await generateSignedUrl(
          envConfig.CF_ACCOUNT_HASH,
          i.object_id,
          imageType,
          envConfig.CF_EXPIRE_SECONDS,
          envConfig.CF_SIGN_KEY,
        ),
        key: hash(i.object_id),
      };
    }),
  );

  return Response.json({ images: signedImageUrls.reverse() });
};
