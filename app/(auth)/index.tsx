import {
  View,
  TextInput,
  FlatList,
  Text,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppleStyleSwipeableRow from '~/components/SwipeableRow';
import { useSystem } from '~/powersync/PowerSync';
import { TODOS_TABLE, Todo } from '~/powersync/AppSchema';
import { uuid } from '~/powersync/uuid';

const Page = () => {
  const [task, setTask] = useState('');
  const { supabaseConnector, db } = useSystem();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const result = await db.selectFrom(TODOS_TABLE).selectAll().execute();
    setTodos(result);
  };

  const addTodo = async () => {
    const { userID } = await supabaseConnector.fetchCredentials();
    const todoId = uuid();

    await db
      .insertInto(TODOS_TABLE)
      .values({ id: todoId, task, user_id: userID, is_complete: 0 })
      .execute();

    setTask('');
    loadTodos();
  };

  const updateTodo = async (todo: Todo) => {
    await db
      .updateTable(TODOS_TABLE)
      .where('id', '=', todo.id)
      .set({ is_complete: todo.is_complete === 1 ? 0 : 1 })
      .execute();
    loadTodos();
  };

  const deleteTodo = async (todo: Todo) => {
    const result = await db.deleteFrom(TODOS_TABLE).where('id', '=', todo.id).execute();
    loadTodos();
  };

  const renderRow: ListRenderItem<any> = ({ item }) => {
    return (
      <AppleStyleSwipeableRow
        onDelete={() => deleteTodo(item)}
        onToggle={() => updateTodo(item)}
        todo={item}>
        <View style={{ padding: 12, flexDirection: 'row', gap: 10, height: 44 }}>
          <Text style={{ flex: 1 }}>{item.task}</Text>
          {item.is_complete === 1 && (
            <Ionicons name="checkmark-done-outline" size={24} color="#00d5ff" />
          )}
        </View>
      </AppleStyleSwipeableRow>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add new task"
          style={styles.input}
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTodo} disabled={task === ''}>
          <Ionicons name="add-outline" size={24} color="#A700FF" />
        </TouchableOpacity>
      </View>

      {todos && (
        <FlatList
          data={todos}
          renderItem={renderRow}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: StyleSheet.hairlineWidth, width: '100%', backgroundColor: 'gray' }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#151515',
    padding: 6,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#363636',
    color: '#fff',
    padding: 8,
    borderWidth: 1,
    borderColor: '#A700FF',
    borderRadius: 4,
  },
});
export default Page;
