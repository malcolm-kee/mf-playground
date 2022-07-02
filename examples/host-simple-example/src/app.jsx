import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Version as RemoteVersion } from 'remote/version';
import { Version } from './components/version';
import './app.css';

ReactDOM.render(
  <div>
    <h1>Compatible Versions</h1>
    <div className="container">
      <Version name="host" color="green" />
      <RemoteVersion name="remote" color="blue" />
    </div>
  </div>,
  document.getElementById('app')
);
