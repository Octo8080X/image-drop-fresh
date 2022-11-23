import "dotenv/load.ts";

const envConfig = {
  SUPABASE_EDGE_FUNCTION_END_POINT: Deno.env.get(
    "SUPABASE_EDGE_FUNCTION_END_POINT",
  )!,
  SUPABASE_ANON_KEY: Deno.env.get("SUPABASE_ANON_KEY")!,
  SESSION_SECONDS: Deno.env.get("SESSION_SECONDS")!,
  SECRET: Deno.env.get("SECRET")!,
  SALT: Deno.env.get("SALT")!,
  CF_SIGN_KEY: Deno.env.get("CF_SIGN_KEY")!,
  CF_EXPIRE_SECONDS: Number(Deno.env.get("CF_EXPIRE_SECONDS")!),
  CF_ACCOUNT_HASH: Deno.env.get("CF_ACCOUNT_HASH")!,
  CF_ACCOUNT_ID: Deno.env.get("CF_ACCOUNT_ID")!,
  CF_AUTH_TOKEN: Deno.env.get("CF_AUTH_TOKEN")!,
};

export { envConfig };
