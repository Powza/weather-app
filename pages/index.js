import { useEffect } from "react";
import { useIsMount } from "../utils/useIsMount";
import Layout from "../components/Layout";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useStoreActions } from "easy-peasy";
import { convertRegion } from "../utils/stateNameAbbreviation";
import Weather from "../components/Weather/Weather";
import { fetchWeather, ipInfo, ipData } from "../api/APIUtils";
import "../styles.scss";

const index = () => {
  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setRegion = useStoreActions(actions => actions.location.setLocationRegion);
  const setSpinner = useStoreActions(actions => actions.spinner.setSpinner);
  const isMount = useIsMount();

  useEffect(() => {
    setSpinner(true);
    if (isMount) {
      const publicIp = require("public-ip");
      publicIp.v4().then(results => {
        ipInfo(results)
          .then(res => {
            const latLng = res.loc.split(",");
            const lat = latLng[0];
            const lng = latLng[1];
            setRegion(convertRegion(res.region));
            setCity(res.city);
            setLatitude(lat);
            setLongitude(lng);
            fetchWeather(lat, lng).then(results => {
              setWeather(results);
              setSpinner(false);
            });
          })
          .catch(err => {
            console.error(err);
            ipData(results)
              .then(res => {
                const lat = res.latitude;
                const lng = res.longitude;
                setRegion(convertRegion(res.region));
                setCity(res.city);
                setLatitude(lat);
                setLongitude(lng);
                fetchWeather(lat, lng).then(results => {
                  setWeather(results);
                  setSpinner(false);
                });
              })
              .catch(err => {
                console.error(err);
              });
          });
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
