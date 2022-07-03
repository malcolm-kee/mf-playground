import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { publicPath } from './env';
import { useRemoteExposes } from './use-remotes';
import { useSessionStorage } from './use-session-storage';

const App = () => {
  // declare a state to simulate changing the config
  // in actual implementation the backend API service should have separate API to change it
  const [configType, setConfigType] = useSessionStorage<'default' | 'single' | 'upgrade'>(
    'configType',
    'default'
  );
  const remotes = useRemoteExposes(configType);

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '2rem' }}>
            Dynamic Host
          </Link>
          <button
            type="button"
            onClick={() => {
              setConfigType(configType === 'default' ? 'single' : 'default');
            }}
          >
            Switch to {configType === 'default' ? 'single' : 'default'}
          </button>
          {configType === 'upgrade' ? (
            <span>Loaded React 18 App</span>
          ) : (
            <button onClick={() => setConfigType('upgrade')} type="button">
              Load React 18 App
            </button>
          )}
        </div>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0 }}>
            {remotes &&
              remotes
                .flatMap((r) => r.navItems)
                .map((item, i) => (
                  <li key={i}>
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                ))}
          </ul>
        </nav>
      </header>
      <main>
        {remotes && (
          <React.Suspense
            fallback={
              <div>
                <p>Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route
                index
                element={
                  <div>
                    <h1>Home</h1>
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div>
                    <h1>Page Not Found</h1>
                  </div>
                }
              />
              {remotes
                .flatMap((r) => r.routes)
                .map(({ path, Component }, i) => (
                  <Route path={path} key={i} element={<Component />} />
                ))}
            </Routes>
          </React.Suspense>
        )}
      </main>
    </div>
  );
};

const removeTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

ReactDOM.render(
  <BrowserRouter basename={removeTrailingSlash(publicPath)}>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
