import { defineExposes } from 'mf-cli/config';
import * as React from 'react';

export default defineExposes({
  routes: [
    {
      path: 'no-import',
      Component: React.lazy(() =>
        import('./components/version').then((m) => ({
          default: m.Version,
        }))
      ),
    },
  ],
  navItems: [
    {
      to: '/no-import',
      label: 'No Import',
    },
  ],
});
