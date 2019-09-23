import { shallow } from "enzyme";
import React from "react";

import App from "../pages/index";

import { StoreProvider } from "easy-peasy";
import withReduxStore from "../lib/with-redux-store";

describe("With Enzyme", () => {
  it("App shows", () => {
    const reduxStore = withReduxStore;
    const app = shallow(
      <StoreProvider store={reduxStore}>
        <App />
      </StoreProvider>
    );
    expect(app);
  });
});
