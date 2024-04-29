import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const todos = pgTable('todos', {
  id: uuid('id').primaryKey().defaultRandom(),
  task: text('task'),
  is_complete: boolean('is_complete').default(false),
  modifiedAt: timestamp('modified_at').defaultNow(),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export type Todo = typeof todos.$inferSelect;
