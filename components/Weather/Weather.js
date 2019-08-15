import styles from "../Weather/Weather.scss";
import { useStoreState } from "easy-peasy";
import WeatherBackground from "./Background/Background";
import Currently from "./Currently/Currently";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WeatherSlider from "../Weather/WeatherSlider/WeatherSlider";
import { resetIdCounter } from "react-tabs";

const weather = props => {
  const weather = useStoreState(state => state.weather.weatherData);
  const city = useStoreState(state => state.location.locationCity);
  const state = useStoreState(state => state.location.locationState);
  resetIdCounter();

  return (
    <div className={styles.weather}>
      <WeatherBackground condition={weather ? weather.currently.icon : ""} />
      <div className={styles["weather-wrap"]}>
        <Currently
          city={city}
          state={state}
          daily={weather ? weather.daily : ""}
          currently={weather ? weather.currently : ""}
        />

        {weather && (
          <Tabs className={styles.tabs} selectedTabClassName={styles.selected}>
            <TabList className="list-group list-group-horizontal">
              <Tab className="list-group-item">Daily</Tab>
              <Tab className="list-group-item">Hourly</Tab>
            </TabList>

            <TabPanel>
              <WeatherSlider day={weather ? weather.daily.data : ""} />
            </TabPanel>
            <TabPanel>
              <WeatherSlider hour={weather ? weather.hourly.data : ""} />
            </TabPanel>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default weather;
