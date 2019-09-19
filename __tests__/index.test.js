import { shallow } from "enzyme";
import React from "react";

import App from "../pages/index";

describe("With Enzyme", () => {
  it("App shows", () => {
    const app = shallow(<App />);
    expect(app);
  });
});
