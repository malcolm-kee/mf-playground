import * as ReactDOM from 'react-dom';
import { Version as RemoteVersion } from 'remote/version';
import { Version } from './components/version';

ReactDOM.render(
  <div>
    <h1>Compatible Versions</h1>
    <Version name="host" color="green" />
    <RemoteVersion name="remote" color="blue" />
  </div>,
  document.getElementById('app')
);
