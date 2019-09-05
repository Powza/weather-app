import { useState } from "react";
import styles from "./Header.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions, useStoreState } from "easy-peasy";
import Search from "../Search/Search";
import { convertRegion } from "../../utils/stateNameAbbreviation";
import { getPosition, fetchLocation, fetchWeather } from "../../api/APIUtils";
import iplocation from "iplocation";

const header = props => {
  const [search, setSearch] = useState({
    address: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const weather = useStoreState(state => state.weather.weatherData);

  const setSpinner = useStoreActions(actions => actions.spinner.setSpinner);
  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setState = useStoreActions(actions => actions.location.setLocationState);

  const latitude = useStoreState(state => state.location.locationLatitude);
  const longitude = useStoreState(state => state.location.locationLongitude);

  const handleSearchChange = address => {
    setSearch({ address });
  };
  const handleSearchSelect = address => {
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
              setCity(addressObj.long_name);
            }
            if (addressObj.types[j] === "administrative_area_level_1") {
              setState(addressObj.short_name);
            }
          }
        }

        fetchWeather(lat, lng).then(results => setWeather(results));
      })
      .catch(error => console.error(error));
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const refreshLocation = () => {
    setSpinner(true);
    setIsOpen(!isOpen);
    fetchWeather(latitude, longitude).then(results => {
      setWeather(results);
      setSpinner(false);
    });
  };

  const useLocation = () => {
    setSpinner(true);
    setIsOpen(!isOpen);
    function getWeatherLocation(lat, lng) {
      fetchLocation(lat, lng).then(results => {
        const json = results.features[0].properties.address;
        if (json.state) {
          let stateAbbr = convertRegion(json.state);
          setState(stateAbbr);
        } else if (json.country) {
          setState(json.country);
        }
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

  const menuClass = `dropdown-menu dropdown-menu-right${isOpen ? " show" : ""} ${styles["dropdown-custom"]}`;

  return (
    <>
      {weather && (
        <header className={styles["header"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mx-auto">
                <div className={styles.mid}>
                  <div className="input-group">
                    <Search address={search.address} changed={handleSearchChange} selected={handleSearchSelect} />
                    <div className="input-group-append">
                      <button
                        className={[["btn"], styles["btn-more"]].join(" ")}
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={toggleOpen}
                      >
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <div className={menuClass} aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#" onClick={refreshLocation}>
                          Refresh Weather
                        </a>
                        <a className="dropdown-item" href="#" onClick={useLocation}>
                          Use My Location
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default header;
