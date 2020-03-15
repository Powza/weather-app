import { useState } from "react";
import styles from "./Header.module.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions, useStoreState } from "easy-peasy";
import Search from "../Search/Search";
import { convertRegion } from "../../utils/stateNameAbbreviation";
import { getPosition, fetchLocation, fetchWeather } from "../../api/APIUtils";
import { toast } from "react-toastify";

import {
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup
} from "reactstrap";

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
  const setRegion = useStoreActions(actions => actions.location.setLocationRegion);

  const latitude = useStoreState(state => state.location.locationLatitude);
  const longitude = useStoreState(state => state.location.locationLongitude);

  let historyArray = null;
  let searchHistory = null;
  if (typeof window !== "undefined") {
    historyArray = localStorage.getItem("search-history")
      ? JSON.parse(localStorage.getItem("search-history"))
      : [];
    searchHistory = JSON.parse(localStorage.getItem("search-history"));
    if (searchHistory === undefined) {
      const keys = ["city", "region"],
        filtered = searchHistory.filter(
          (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join("|")))(new Set())
        );
      localStorage.setItem("search-history", JSON.stringify(filtered));
    }
  }

  const clearAllHistory = () => {
    localStorage.removeItem("search-history");
  };

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
    setRegion(newHistory[index].region);
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
        let region = null;
        setLatitude(lat);
        setLongitude(lng);
        setSearch({ address: "" });
        for (var i = 0; i < dataAddress.length; i++) {
          var addressObj = dataAddress[i];
          for (var j = 0; j < addressObj.types.length; j++) {
            if (addressObj.types[j] === "locality") {
              setCity(addressObj.long_name);
              city = addressObj.long_name;
            }
            if (addressObj.types[j] === "administrative_area_level_1") {
              setRegion(addressObj.short_name);
              region = addressObj.short_name;
            }
          }
        }
        historyArray.push({ city: city, region: region, lat: lat, lng: lng });
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
    notify("Refreshing Weather Data");
    fetchWeather(latitude, longitude).then(results => {
      setWeather(results);
      setSpinner(false);
      toast.dismiss(toastId);
    });
  };

  function getWeatherLocation(lat, lng) {
    fetchLocation(lat, lng).then(results => {
      const json = results.features[0].properties.address;
      if (json.state) {
        let stateAbbr = convertRegion(json.state);
        setRegion(stateAbbr);
      } else if (json.country) {
        setRegion(json.country);
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
      toast.dismiss(toastId);
    });
  }

  let toastId = null;

  const notify = data => (toastId = toast.info(data, { autoClose: false }));
  const update = data =>
    toast.update(toastId, { render: data, type: toast.TYPE.SUCCESS, autoClose: 5000 });

  const useLocation = () => {
    setSpinner(true);
    setDropdownOpen(!dropdownOpen);
    notify("Hang tight! Checking your location.");
    getPosition()
      .then(results => {
        const lat = results.coords.latitude;
        const lng = results.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        getWeatherLocation(lat, lng);
      })
      .catch(error => {
        setSpinner(false);
        toast.update(toastId, {
          render: `Error! ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000
        });
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
                  <InputGroup>
                    <Search
                      address={search.address}
                      changed={handleSearchChange}
                      selected={handleSearchSelect}
                    />
                    <InputGroupButtonDropdown
                      addonType="append"
                      isOpen={dropdownOpen}
                      toggle={toggleDropdown}>
                      <DropdownToggle className={styles["btn-more"]}>
                      <svg height="512" viewBox="0 0 515.555 515.555" width="512" xmlns="http://www.w3.org/2000/svg"><path d="M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0"/></svg>
                      </DropdownToggle>
                      <DropdownMenu right className={styles["dropdown-custom"]}>
                        <DropdownItem onClick={refreshLocation}>
                          Refresh Weather
                          <span className={styles["btn-right"]}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.815 70.629c-11.001-1.003-20.73 7.102-21.733 18.102l-2.65 29.069C424.473 47.194 346.429 0 256 0 158.719 0 72.988 55.522 30.43 138.854c-5.024 9.837-1.122 21.884 8.715 26.908 9.839 5.024 21.884 1.123 26.908-8.715C102.07 86.523 174.397 40 256 40c74.377 0 141.499 38.731 179.953 99.408l-28.517-20.367c-8.989-6.419-21.48-4.337-27.899 4.651-6.419 8.989-4.337 21.479 4.651 27.899l86.475 61.761c12.674 9.035 30.155.764 31.541-14.459l9.711-106.53c1.004-11.001-7.1-20.731-18.1-21.734zM472.855 346.238c-9.838-5.023-21.884-1.122-26.908 8.715C409.93 425.477 337.603 472 256 472c-74.377 0-141.499-38.731-179.953-99.408l28.517 20.367c8.989 6.419 21.479 4.337 27.899-4.651 6.419-8.989 4.337-21.479-4.651-27.899l-86.475-61.761c-12.519-8.944-30.141-.921-31.541 14.459L.085 419.637c-1.003 11 7.102 20.73 18.101 21.733 11.014 1.001 20.731-7.112 21.733-18.102l2.65-29.069C87.527 464.806 165.571 512 256 512c97.281 0 183.012-55.522 225.57-138.854 5.024-9.837 1.122-21.884-8.715-26.908z"/></svg>
                          </span>
                        </DropdownItem>
                        <DropdownItem onClick={useLocation}>
                          Use My Location
                          <span className={styles["btn-right"]}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.636 51.636"><path d="M51.353.914a.999.999 0 00-1.135-.213L.583 23.481a1 1 0 00.252 1.895l22.263 3.731 2.545 21.038a1.002 1.002 0 001.889.324l24-48.415a1 1 0 00-.179-1.14z"/></svg>
                          </span>
                        </DropdownItem>
                        {searchHistory != null && (
                          <>
                            <DropdownItem divider />
                            <DropdownItem header>Search History </DropdownItem>
                            {searchHistory.map((item, index) => {
                              return (
                                <DropdownItem key={index}>
                                  <span
                                    onClick={() => {
                                      useSpecificHistory(index);
                                    }}>
                                    {item.city}, {item.region}
                                  </span>

                                  <span
                                    className={[styles["btn-remove"], styles["btn-right"]].join(
                                      " "
                                    )}
                                    onClick={() => {
                                      deleteSpecificHistory(index);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001"><path d="M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z"/></svg>
                                  </span>
                                </DropdownItem>
                              );
                            })}
                            <DropdownItem divider />
                            <DropdownItem
                              className={styles["btn-last"]}
                              onClick={() => {
                                clearAllHistory();
                              }}>
                              Clear Search History
                            </DropdownItem>
                          </>
                        )}
                      </DropdownMenu>
                    </InputGroupButtonDropdown>
                  </InputGroup>
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
