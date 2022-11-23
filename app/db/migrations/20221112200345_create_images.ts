import {
  AbstractMigration,
  ClientPostgreSQL,
  Info,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray(`
          CREATE TABLE IF NOT EXISTS public.images (
              id serial primary key,
              object_id text,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
      `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray("DROP TABLE public.images;");
  }
}
