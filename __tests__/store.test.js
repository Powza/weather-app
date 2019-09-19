import { action, createStore } from "easy-peasy";

const weather = {
  weatherData: {},
  add: action((state, weatherData) => {
    state.weatherData[weatherData.id] = weatherData;
  })
};

test("add todo action", async () => {
  // arrange
  const weatherData = { id: 1, text: "foo" };
  const store = createStore(weather);

  // act
  store.getActions().add(weatherData);

  // assert
  expect(store.getState().weatherData).toEqual({ [weatherData.id]: weatherData });
});
