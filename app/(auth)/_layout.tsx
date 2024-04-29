import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSystem } from '~/powersync/PowerSync';

const Layout = () => {
  const { supabaseConnector, powersync } = useSystem();

  const onSignOut = async () => {
    await powersync.disconnectAndClear();
    await supabaseConnector.client.auth.signOut();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Power Todos',
            headerStyle: { backgroundColor: '#151515' },
            headerTitleStyle: { color: '#fff' },
            headerLeft: () => (
              <TouchableOpacity onPress={onSignOut}>
                <Ionicons name="log-out-outline" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};
export default Layout;
