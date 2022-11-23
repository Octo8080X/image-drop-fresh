# Image Drop Fresh

It is made using Fresh and supabase.

# Usage

```sh
# open console
npx supabase start
npx supabase functions serve image_posts_api

# open another console
docker compose up -d
docker compose exec app bash

cd app
deno task migrate
deno task start

# => access localhost:8000
```

# setup

```
# .env

# youre supabase params
# ex. this params target is docker from supabase cli 
SUPABASE_EDGE_FUNCTION_END_POINT=http://host.docker.internal:54321/functions/v1/image_posts_api
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSJ9.vI9obAHOGyVVKa3pD--kJlyxp-Z2zV9UUMAhKpNLAcU
SUPABASE_POSTGRES_DB=postgres
SUPABASE_POSTGRES_HOST=host.docker.internal
SUPABASE_POSTGRES_USER=postgres
SUPABASE_POSTGRES_PASSWORD=postgres
SUPABASE_POSTGRES_PORT=54322

# your Cloudflare params
CF_SIGN_KEY=
CF_EXPIRE_SECONDS= 3600
CF_ACCOUNT_HASH=
CF_ACCOUNT_ID=
CF_AUTH_TOKEN=
```