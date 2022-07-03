import { Version as EdgeVersion } from 'edge/version';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Version as RemoteVersion } from 'remote/version';
import './app.css';
import { Version } from './components/version';

ReactDOM.render(
  <div>
    <h1>Force Host Version</h1>
    <div className="container">
      <Version name="host" color="green" />
      <RemoteVersion name="remote" color="blue" />
      <EdgeVersion name="edge" color="red" />
    </div>
  </div>,
  document.getElementById('app')
);
