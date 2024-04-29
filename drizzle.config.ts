import type { Config } from 'drizzle-kit';

export default {
  schema: './models',
  out: './supabase/migrations',
} satisfies Config;
