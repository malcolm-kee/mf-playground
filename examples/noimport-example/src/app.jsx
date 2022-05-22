import { createRoot } from 'react-dom/client';
import { Version } from './components/version';

createRoot(document.getElementById('app')).render(
  <div>
    <Version name="edge" />
  </div>
);
