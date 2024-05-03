// https://github.com/powersync-ja/powersync-js/blob/main/demos/react-native-supabase-group-chat/src/lib/uuid.ts
import * as Crypto from 'expo-crypto';

export function uuid() {
  return Crypto.randomUUID();
}
