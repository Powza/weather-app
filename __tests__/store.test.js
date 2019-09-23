import { action, createStore } from "easy-peasy";

const weather = {
  weatherData: {},
  add: action((state, weatherData) => {
    state.weatherData[weatherData.time] = weatherData;
  })
};

test("Add Weather Data", async () => {
  const weatherData = { time: 1509993277, summary: "Drizzle" };
  const store = createStore(weather);

  store.getActions().add(weatherData);

  expect(store.getState().weatherData).toEqual({ [weatherData.time]: weatherData });
});
