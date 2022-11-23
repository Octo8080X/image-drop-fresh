import { HandlerContext } from "$fresh/server.ts";
import { envConfig } from "../../util/config.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const requestJson = await req.json();

  const result = await fetch(
    `${envConfig.SUPABASE_EDGE_FUNCTION_END_POINT}/images`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${envConfig.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        object_id: requestJson.result.id,
      }),
    },
  );

  if (!result.ok) {
    return Response.json({ status: false });
  }

  const resultJson = await result.json();

  if (!resultJson || !resultJson.id) {
    return Response.json({ status: false });
  }

  return Response.json({ status: true });
};
