import { Version as EdgeVersion } from 'edge/version';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Version as RemoteVersion } from 'remote/version';
import { Version } from './components/version';
import './app.css';

ReactDOM.render(
  <div>
    <h1>Force Singleton</h1>
    <div className="container">
      <Version name="host" color="green" />
      <RemoteVersion name="remote" color="blue" />
      <EdgeVersion name="edge" color="red" />
    </div>
  </div>,
  document.getElementById('app')
);
