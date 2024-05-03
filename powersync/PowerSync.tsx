import '@azure/core-asynciterator-polyfill';
import 'react-native-polyfill-globals/auto';
import { createContext, useContext } from 'react';
import {
  AbstractPowerSyncDatabase,
  RNQSPowerSyncDatabaseOpenFactory,
} from '@powersync/react-native';
import { AppSchema, Database } from './AppSchema';
import { SupabaseConnector } from '~/powersync/SupabaseConnector';
import { Kysely, wrapPowerSyncWithKysely } from '@powersync/kysely-driver';

export class System {
  supabaseConnector: SupabaseConnector;
  powersync: AbstractPowerSyncDatabase;
  db: Kysely<Database>;

  constructor() {
    const factory = new RNQSPowerSyncDatabaseOpenFactory({
      schema: AppSchema,
      dbFilename: 'app.sqlite',
    });

    this.supabaseConnector = new SupabaseConnector();
    this.powersync = factory.getInstance();
    this.db = wrapPowerSyncWithKysely(this.powersync);
  }

  async init() {
    console.log('Initializing system');
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);
  }
}

export const system = new System();
export const SystemContext = createContext(system);
export const useSystem = () => useContext(SystemContext);
