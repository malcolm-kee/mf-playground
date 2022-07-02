import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { loadRemoteModule } from 'mf-cli/mf';

const EdgeVersion = React.lazy(() =>
  loadRemoteModule({
    remoteName: 'edge',
    exposedModule: './version',
  }).then((m) => ({
    default: m.Version,
  }))
);

const App = () => {
  const [showRemote, setShowRemote] = React.useState(false);

  return (
    <div>
      <h1>Dynamic Host</h1>
      <p>Version: {ReactDOM.version}</p>
      <button onClick={() => setShowRemote(!showRemote)} type="button">
        Load Remote
      </button>
      <React.Suspense fallback="Loading...">{showRemote && <EdgeVersion />}</React.Suspense>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
