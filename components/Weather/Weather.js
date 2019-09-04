import styles from "../Weather/Weather.scss";
import { useStoreState } from "easy-peasy";
import WeatherBackground from "./Background/Background";
import Currently from "./Currently/Currently";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DailySlider from "../Weather/WeatherSlider/DailySlider/DailySlider";
import HourlySlider from "../Weather/WeatherSlider/HourlySlider/HourlySlider";
import { resetIdCounter } from "react-tabs";

const weather = props => {
  const spinner = useStoreState(state => state.spinner);
  const weather = useStoreState(state => state.weather.weatherData);
  const city = useStoreState(state => state.location.locationCity);
  const state = useStoreState(state => state.location.locationState);
  resetIdCounter();

  return (
    <>
      <div className={styles.weather}>
        <WeatherBackground condition={weather && weather.currently.icon} />
        {spinner.spinner === true && <div className="loading-spinner"></div>}
        <div className={styles["weather-wrap"]}>
          <Currently
            city={city}
            state={state}
            daily={weather && weather.daily}
            currently={weather && weather.currently}
            alerts={weather && weather.alerts}
            flags={weather && weather.flags}
          />

          {weather && (
            <Tabs className={styles.tabs} selectedTabClassName={styles.selected}>
              <TabList className="list-group list-group-horizontal">
                <Tab className="list-group-item">Daily</Tab>
                <Tab className="list-group-item">Hourly</Tab>
              </TabList>
              <TabPanel>
                <DailySlider weather={weather} />
              </TabPanel>
              <TabPanel>
                <HourlySlider weather={weather} />
              </TabPanel>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
};

export default weather;
