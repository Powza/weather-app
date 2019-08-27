import { useState } from "react";
import styles from "./Header.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions } from "easy-peasy";
import Search from "../Search/Search";
import { convertRegion } from "../../utils/stateNameAbbreviation";
import { getPosition, fetchLocation, fetchWeather } from "../../api/APIUtils";

const header = props => {
  const [search, setSearch] = useState({
    address: ""
  });
  const setSpinner = useStoreActions(actions => actions.spinner.setSpinner);
  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setState = useStoreActions(actions => actions.location.setLocationState);

  const handleSearchChange = address => {
    setSearch({ address });
  };
  const handleSearchSelect = address => {
    function getWeatherLocation(lat, lng) {
      fetchLocation(lat, lng).then(results => {
        const json = results.features[0].properties.address;
        let stateAbbr = convertRegion(json.state);
        setState(stateAbbr);
        if (json.locality) {
          setCity(json.locality);
        } else if (json.town) {
          setCity(json.town);
        } else if (json.city) {
          setCity(json.city);
        } else if (json.county) {
          setCity(json.county);
        }
      });
      fetchWeather(lat, lng).then(results => setWeather(results));
    }
    setSpinner(true);
    geocodeByAddress(address)
      .then(results => results[0])
      .then(data => {
        const dataAddress = data.address_components;
        const lat = data.geometry.location.lat();
        const lng = data.geometry.location.lng();
        setLatitude(lat);
        setLongitude(lng);
        setSearch({ address: "" });
        setSpinner(false);
        for (var i = 0; i < dataAddress.length; i += 1) {
          var addressObj = dataAddress[i];
          for (var j = 0; j < addressObj.types.length; j += 1) {
            if (addressObj.types[j] === "locality") {
              //console.log(addressObj.long_name);
              setCity(addressObj.long_name);
            }
            if (addressObj.types[j] === "administrative_area_level_1") {
              //console.log(addressObj.short_name);
              setState(addressObj.short_name);
            }
          }
        }

        fetchWeather(lat, lng).then(results => setWeather(results));
      })
      .catch(error => console.error(error));
  };

  const useLocation = () => {
    setSpinner(true);
    function getWeatherLocation(lat, lng) {
      fetchLocation(lat, lng).then(results => {
        const json = results.features[0].properties.address;
        let stateAbbr = convertRegion(json.state);
        setState(stateAbbr);
        if (json.locality) {
          setCity(json.locality);
        } else if (json.town) {
          setCity(json.town);
        } else if (json.city) {
          setCity(json.city);
        } else if (json.county) {
          setCity(json.county);
        }
      });
      fetchWeather(lat, lng).then(results => setWeather(results));
    }
    getPosition()
      .then(results => {
        const lat = results.coords.latitude;
        const lng = results.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getWeatherLocation(lat, lng);
        console.log("Geolocation Status: Success");
        setSpinner(false);
      })
      .catch(error => {
        const iplocation = require("iplocation").default;
        const publicIp = require("public-ip");
        const providerList = require("../../api/iplocation_providers.json");
        const filterData = providerList
          .filter(data => {
            return data.is_free === true;
          })
          .map(data => {
            return data.uri;
          });

        publicIp.v4().then(results => {
          iplocation(results, filterData)
            .then(res => {
              const lat = res.latitude;
              const lng = res.longitude;
              setLatitude(lat);
              setLongitude(lng);
              getWeatherLocation(lat, lng);
              setSpinner(false);
            })
            .catch(err => {
              console.error("IP Location Status:", err.message, "| Must type a city in search bar instead.");
            });
        });
        console.error("Geolocation Status:", error.message, "| Trying IP location search instead.");
      });
  };

  return (
    <header className={styles["header"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mx-auto">
            <div className={styles.mid}>
              {/* <Search address={search.address} changed={handleSearchChange} selected={handleSearchSelect} />
              <button className={styles["btn-location"]} onClick={useLocation}>
                Refresh
              </button> */}
              <div className="input-group">
                <Search address={search.address} changed={handleSearchChange} selected={handleSearchSelect} />
                <div className="input-group-append">
                  <button className={[["btn"], styles["btn-location"]].join(" ")} type="button" onClick={useLocation}>
                    <i className="fas fa-location-arrow"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
