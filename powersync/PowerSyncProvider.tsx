import { PowerSyncContext } from '@powersync/react-native';
import { ReactNode, useMemo } from 'react';

import { useSystem } from '~/powersync/PowerSync';

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { powersync, db } = useSystem();

  const database = useMemo(() => {
    // Types of db do not match the expected types of PowerSyncContext.Provider
    return db as any;
    // return powersync;
  }, []);

  return <PowerSyncContext.Provider value={database}>{children}</PowerSyncContext.Provider>;
};
