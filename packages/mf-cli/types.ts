import * as React from 'react';

export interface Exposes {
  routes: Array<{
    path: string;
    Component: React.ComponentType;
  }>;
  navItems: Array<{
    label: string;
    to: string;
  }>;
}
