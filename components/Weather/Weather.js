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
  const region = useStoreState(state => state.location.locationRegion);
  resetIdCounter();

  return (
    <div className={styles.weather}>
      <div className={styles["weather-wrap"]}>
        {spinner.spinner === true && <div className="loading-spinner"></div>}
        {weather && (
          <>
            <WeatherBackground condition={weather.currently.icon} />
            <Currently
              city={city}
              region={region}
              daily={weather.daily}
              currently={weather.currently}
              alerts={weather.alerts}
              flags={weather.flags}
            />
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
          </>
        )}
      </div>
    </div>
  );
};

export default weather;
