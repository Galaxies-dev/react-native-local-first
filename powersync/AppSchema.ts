import { Column, ColumnType, Schema, Table } from '@powersync/react-native';

export const AppSchema = new Schema([
  new Table({
    name: 'todos',
    columns: [
      new Column({ name: 'task', type: ColumnType.TEXT }),
      new Column({ name: 'is_complete', type: ColumnType.INTEGER }),
      new Column({ name: 'modified_at', type: ColumnType.TEXT }),
      new Column({ name: 'user_id', type: ColumnType.TEXT }),
    ],
  }),
]);
