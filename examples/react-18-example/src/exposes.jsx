import { defineExposes } from 'mf-cli/config';
import * as React from 'react';

export default defineExposes({
  routes: [
    {
      path: 'react-18',
      Component: React.lazy(() => import('./components/toggle')),
    },
  ],
  navItems: [
    {
      to: '/react-18',
      label: 'React 18',
    },
  ],
});
