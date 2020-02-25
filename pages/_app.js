import App from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { StoreProvider } from 'easy-peasy';

class WeatherApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <StoreProvider store={reduxStore}>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}

export default withReduxStore(WeatherApp);
