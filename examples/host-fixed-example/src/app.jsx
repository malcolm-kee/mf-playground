import { Version as EdgeVersion } from 'edge/version';
import * as ReactDOM from 'react-dom';
import { Version as RemoteVersion } from 'remote/version';
import { Version } from './components/version';

ReactDOM.render(
  <div>
    <h1>Force Singleton</h1>
    <Version name="host" color="green" />
    <RemoteVersion name="remote" color="blue" />
    <EdgeVersion name="edge" color="red" />
  </div>,
  document.getElementById('app')
);
