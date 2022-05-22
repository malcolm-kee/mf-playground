import * as React from 'react';
import mfConfig from '../../module-federation.config';
import pkgJson from '../../package.json';

export const Version = ({ name, color }) => {
  const [isShown, setIsShown] = React.useState(false);

  return (
    <div
      style={{
        border: `1px dashed ${color}`,
        margin: '2rem',
        padding: '1rem',
      }}
    >
      <p>
        Hello from {name}. I am using React version{' '}
        {isShown ? (
          React.version
        ) : (
          <>
            <span data-version={React.version}>??</span>
            <button onClick={() => setIsShown(true)}>Show</button>
          </>
        )}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <pre>{JSON.stringify(pkgJson.dependencies, null, 2)}</pre>
        <pre>{JSON.stringify(mfConfig, null, 2)}</pre>
      </div>
    </div>
  );
};
