import {
  View,
  TextInput,
  FlatList,
  Text,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppleStyleSwipeableRow from '~/components/SwipeableRow';
import { Todo } from '~/models/todo';
import { useSystem } from '~/powersync/PowerSync';
import { usePowerSyncWatchedQuery } from '@powersync/react-native';

const Page = () => {
  const [task, setTask] = useState('');
  const todos = usePowerSyncWatchedQuery<Todo[]>(`SELECT * FROM todos`);
  const { supabaseConnector, powersync } = useSystem();

  const addTodo = async () => {
    const { userID } = await supabaseConnector.fetchCredentials();
    await powersync.execute(
      `INSERT INTO todos (id, task, user_id) VALUES (uuid(), ?, ?) RETURNING *`,
      [task, userID]
    );
    setTask('');
  };

  const updateTodo = async (todo: Todo) => {
    await powersync.execute(`UPDATE todos SET is_complete = ? WHERE id = ? RETURNING *`, [
      !todo.is_complete,
      todo.id,
    ]);
  };

  const deleteTodo = async (todo: Todo) => {
    await powersync.execute(`DELETE FROM todos WHERE id = ?`, [todo.id]);
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
