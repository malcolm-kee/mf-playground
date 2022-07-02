import { defineExposes } from 'mf-cli/config';
import * as React from 'react';

export default defineExposes({
  routes: [
    {
      path: 'remote',
      Component: function RemoteComponent() {
        return (
          <div>
            <h1>Component from Remote</h1>
          </div>
        );
      },
    },
  ],
  navItems: [
    {
      to: '/remote',
      label: 'Remote',
    },
  ],
});
