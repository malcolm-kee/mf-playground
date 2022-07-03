import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes, useSearchParams } from 'react-router-dom';
import { useRemoteExposes } from './use-remotes';
import { useSessionStorage } from './use-session-storage';

const App = () => {
  const [configType, setConfigType] = useSessionStorage('configType', 'default');

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

/**
 *
 * @param {string} str
 */
const removeTrailingSlash = (str) => (str.endsWith('/') ? str.slice(0, -1) : str);

ReactDOM.render(
  <BrowserRouter basename={removeTrailingSlash(__webpack_public_path__)}>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
