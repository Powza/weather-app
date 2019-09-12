import { useEffect } from "react";
import { useIsMount } from "../utils/useIsMount";
import Layout from "../components/Layout";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useStoreActions } from "easy-peasy";
import Weather from "../components/Weather/Weather";
import { fetchWeather, fetchIpLocationData } from "../api/APIUtils";
import "../styles.scss";

const index = () => {
  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setRegion = useStoreActions(actions => actions.location.setLocationRegion);
  const setSpinner = useStoreActions(actions => actions.spinner.setSpinner);
  const isMount = useIsMount();

  function getWeatherByIp(ip) {
    fetchIpLocationData(ip).then(results => {
      setRegion(results.region);
      setCity(results.city);
      setLatitude(results.lat);
      setLongitude(results.lon);
      fetchWeather(results.lat, results.lon).then(results => {
        setWeather(results);
        setSpinner(false);
      });
    });
  }

  useEffect(() => {
    setSpinner(true);
    if (isMount) {
      const publicIp = require("public-ip");
      publicIp.v4().then(ip => {
        getWeatherByIp(ip);
      });
    }
  }, []);

  return (
    <Layout title="Weather App">
      <Header />
      <Weather />
      <Footer />
    </Layout>
  );
};

export default index;
