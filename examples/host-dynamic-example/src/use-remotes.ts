import { loadRemoteModule } from 'mf-cli/mf';
import type { Exposes } from 'mf-cli/types';
import * as React from 'react';
import { getConfig } from './config.service';
import { createAsyncCache } from './lib';

// Create a cache for the remote modules
// In actual implementation you can use a singleton variable to store them instead, i.e.
// let _result;
// const getConfig = () => _result ? Promise.resolve(_result) : loadConfig().then(result => {_result = result; return result});
const configRequest = createAsyncCache((configType: string) =>
  getConfig(configType).then((r) =>
    Promise.all(
      r.remotes.map((remote) =>
        loadRemoteModule<{ default: Exposes }>({
          remoteName: remote.name,
          exposedModule: remote.exposedModule,
          remoteEntry: remote.entryUrl,
        }).then((m) => m.default)
      )
    )
  )
);

export const useRemoteExposes = (configType = 'default') => {
  const [config, setConfig] = React.useState(() => configRequest.cache.get(configType));
  React.useEffect(() => {
    configRequest.invoke(configType, setConfig);
  }, [configType]);

  return config;
};
