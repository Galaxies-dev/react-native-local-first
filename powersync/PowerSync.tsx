import '@azure/core-asynciterator-polyfill';
import 'react-native-polyfill-globals/auto';
import React from 'react';
import {
  AbstractPowerSyncDatabase,
  RNQSPowerSyncDatabaseOpenFactory,
} from '@powersync/react-native';
import { AppSchema } from './AppSchema';
import { SupabaseConnector } from '~/powersync/SupabaseConnector';

export class System {
  supabaseConnector: SupabaseConnector;
  powersync: AbstractPowerSyncDatabase;

  constructor() {
    const factory = new RNQSPowerSyncDatabaseOpenFactory({
      schema: AppSchema,
      dbFilename: 'myapp.db',
    });

    this.supabaseConnector = new SupabaseConnector();
    this.powersync = factory.getInstance();
  }

  async init() {
    await this.powersync.init();
    await this.powersync.connect(this.supabaseConnector);
  }
}

export const system = new System();

export const SystemContext = React.createContext(system);
export const useSystem = () => React.useContext(SystemContext);
