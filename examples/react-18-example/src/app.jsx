import * as React from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('app')).render(
  <div>
    <h1>React version: {React.version}</h1>
  </div>
);
