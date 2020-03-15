import App from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { StoreProvider } from "easy-peasy";
import "bootstrap/dist/css/bootstrap.css";
import "../styles.scss";
import "react-toastify/dist/ReactToastify.css";

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
