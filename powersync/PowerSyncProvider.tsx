import { PowerSyncContext } from '@powersync/react-native';
import { ReactNode, useMemo } from 'react';

import { useSystem } from '~/powersync/PowerSync';

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { powersync } = useSystem();

  const db = useMemo(() => {
    return powersync;
  }, []);

  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};
