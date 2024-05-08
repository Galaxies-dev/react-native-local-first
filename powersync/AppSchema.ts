import { column, Schema, TableV2 } from '@powersync/react-native';

export const TODOS_TABLE = 'todos';

const todos = new TableV2({
  task: column.text,
  user_id: column.text,
  is_complete: column.integer,
});

export const AppSchema = new Schema({
  todos,
});

export type Database = (typeof AppSchema)['types'];
export type Todo = Database['todos'];
