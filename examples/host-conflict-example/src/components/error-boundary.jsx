import * as React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? <p>Error</p> : <>{this.props.children}</>;
  }
}
