import { createClient } from "https://esm.sh/@supabase/supabase-js@^1.33.2";
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { Router } from "https://deno.land/x/acorn/mod.ts";

export const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

const router = new Router();

router.get("/image_posts_api/images", async (_ctx) => {
  const images = await supabaseClient.from("images").select(
    "id, object_id",
  );

  if (images.error) {
    console.error(images.error);
    throw new Error();
  }

  return { images: images.data };
});

router.post("/image_posts_api/images", async (ctx) => {
  const params = (await ctx.body()) as {
    object_id: string;
  };

  const { data, error } = await supabaseClient.from("images").insert([
    params,
  ]).single();

  if (error) {
    console.error(error);
    throw new Error();
  }

  return { ...data };
});

await serve(
  (req) => {
    console.info(req);
    return router.handle(req);
  },
);
