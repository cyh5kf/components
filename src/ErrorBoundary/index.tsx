import React, {Component} from 'react';

interface ErrorBoundaryProps {
  children: any;
}

interface ErrorBoundaryStates {
  error: any;
  errorInfo: any;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    let {error, errorInfo} = this.state;
    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>出错了.</h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
