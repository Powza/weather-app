import { useState } from "react";
import styles from "./Header.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions, useStoreState } from "easy-peasy";
import Search from "../Search/Search";
import { convertRegion } from "../../utils/stateNameAbbreviation";
import { getPosition, fetchLocation, fetchWeather } from "../../api/APIUtils";
import iplocation from "iplocation";

import { InputGroupButtonDropdown, Badge, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const header = props => {
  const [search, setSearch] = useState({
    address: ""
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const weather = useStoreState(state => state.weather.weatherData);

  const setSpinner = useStoreActions(actions => actions.spinner.setSpinner);
  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setState = useStoreActions(actions => actions.location.setLocationState);

  const latitude = useStoreState(state => state.location.locationLatitude);
  const longitude = useStoreState(state => state.location.locationLongitude);

  let historyArray = null;
  let searchHistory = null;
  if (typeof window !== "undefined") {
    historyArray = localStorage.getItem("search-history") ? JSON.parse(localStorage.getItem("search-history")) : [];
    searchHistory = JSON.parse(localStorage.getItem("search-history"));
  }

  const deleteSpecificHistory = index => {
    let newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    localStorage.setItem("search-history", JSON.stringify(newHistory));
    if (newHistory === undefined || newHistory.length == 0) {
      localStorage.removeItem("search-history");
    }
  };

  const useSpecificHistory = index => {
    let newHistory = [...searchHistory];
    setSpinner(true);
    setCity(newHistory[index].city);
    setState(newHistory[index].state);
    fetchWeather(newHistory[index].lat, newHistory[index].lng).then(results => {
      setWeather(results);
      setSpinner(false);
    });
  };

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
        let city = null;
        let state = null;
        setLatitude(lat);
        setLongitude(lng);
        setSearch({ address: "" });
        for (var i = 0; i < dataAddress.length; i += 1) {
          var addressObj = dataAddress[i];
          for (var j = 0; j < addressObj.types.length; j += 1) {
            if (addressObj.types[j] === "locality") {
              setCity(addressObj.long_name);
              city = addressObj.long_name;
            }
            if (addressObj.types[j] === "administrative_area_level_1") {
              setState(addressObj.short_name);
              state = addressObj.short_name;
            }
          }
        }
        historyArray.push({ city: city, state: state, lat: lat, lng: lng });
        localStorage.setItem("search-history", JSON.stringify(historyArray));
        fetchWeather(lat, lng).then(results => {
          setWeather(results);
          setSpinner(false);
        });
      })
      .catch(error => console.error(error));
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const refreshLocation = () => {
    setSpinner(true);
    fetchWeather(latitude, longitude).then(results => {
      setWeather(results);
      setSpinner(false);
    });
  };

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
    fetchWeather(lat, lng).then(results => {
      setWeather(results);
      setSpinner(false);
    });
  }

  const useLocation = () => {
    setSpinner(true);
    setDropdownOpen(!dropdownOpen);
    getPosition()
      .then(results => {
        const lat = results.coords.latitude;
        const lng = results.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getWeatherLocation(lat, lng);
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
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle className={styles["btn-more"]}>
                        <i className="fas fa-ellipsis-v"></i>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={refreshLocation}>Refresh Weather</DropdownItem>
                        <DropdownItem onClick={useLocation}>Use My Location</DropdownItem>
                        {searchHistory != null && (
                          <>
                            <DropdownItem divider />
                            <DropdownItem header>Search History</DropdownItem>
                            {searchHistory.map((item, index) => {
                              return (
                                <DropdownItem key={index}>
                                  <span
                                    onClick={() => {
                                      useSpecificHistory(index);
                                    }}
                                  >
                                    {item.city}, {item.state}
                                  </span>
                                  <span
                                    className={styles["btn-remove"]}
                                    onClick={() => {
                                      deleteSpecificHistory(index);
                                    }}
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </span>
                                </DropdownItem>
                              );
                            })}
                          </>
                        )}
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
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
