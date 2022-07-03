import { loadRemoteModule } from 'mf-cli/mf';
import type { Exposes } from 'mf-cli/types';
import * as React from 'react';
import { getConfig } from './config.service';
import { createAsyncCache } from './lib';

const configRequest = createAsyncCache((configType: string) =>
  getConfig(configType).then((r) =>
    Promise.all(
      r.remotes.map((remote) =>
        loadRemoteModule<{ default: Exposes }>({
          remoteName: remote.name,
          exposedModule: './exposes',
          remoteEntry: remote.entryUrl,
        }).then((m) => m.default)
      )
    )
  )
);

export const useRemoteExposes = (configType = 'default') => {
  const [config, setConfig] = React.useState(() => configRequest.cache.get(configType));
  React.useEffect(() => {
    configRequest.invoke(configType).then(setConfig);
  }, [configType]);

  return config;
};
