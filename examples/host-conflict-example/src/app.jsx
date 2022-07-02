import { Version as EdgeVersion } from 'edge/version';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Version as RemoteVersion } from 'remote/version';
import './app.css';
import { ErrorBoundary } from './components/error-boundary';
import { Version } from './components/version';

ReactDOM.render(
  <div>
    <h1>Incompatible Versions</h1>
    <div className="container">
      <ErrorBoundary>
        <Version name="host" color="green" />
      </ErrorBoundary>
      <ErrorBoundary>
        <RemoteVersion name="remote" color="blue" />
      </ErrorBoundary>
      <ErrorBoundary>
        <EdgeVersion name="edge" color="red" />
      </ErrorBoundary>
    </div>
  </div>,
  document.getElementById('app')
);
