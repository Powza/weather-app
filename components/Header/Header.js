import { useState } from "react";
import styles from "./Header.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions, useStoreState } from "easy-peasy";
import Search from "../Search/Search";
import { convertRegion } from "../../utils/stateNameAbbreviation";
import { getPosition, fetchLocation, fetchWeather } from "../../api/APIUtils";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InputGroupButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup } from "reactstrap";

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
    historyArray = localStorage.getItem("search-history") ? JSON.parse(localStorage.getItem("search-history")) : [];
    searchHistory = JSON.parse(localStorage.getItem("search-history"));
    if (searchHistory === undefined) {
      const keys = ["city", "region"],
        filtered = searchHistory.filter((s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join("|")))(new Set()));
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
  const update = data => toast.update(toastId, { render: data, type: toast.TYPE.SUCCESS, autoClose: 5000 });

  const useLocation = () => {
    setSpinner(true);
    setDropdownOpen(!dropdownOpen);
    notify("Hang tight! We are finding your location.");
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
        toast.update(toastId, { render: `Error! ${error.message}`, type: toast.TYPE.ERROR, autoClose: 5000 });
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
                    <Search address={search.address} changed={handleSearchChange} selected={handleSearchSelect} />
                    <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle className={styles["btn-more"]}>
                        <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
                      </DropdownToggle>
                      <DropdownMenu right className={styles["dropdown-custom"]}>
                        <DropdownItem onClick={refreshLocation}>
                          Refresh Weather
                          <span className={styles["btn-right"]}>
                            <FontAwesomeIcon icon={["fas", "sync"]} />
                          </span>
                        </DropdownItem>
                        <DropdownItem onClick={useLocation}>
                          Use My Location
                          <span className={styles["btn-right"]}>
                            <FontAwesomeIcon icon={["fas", "location-arrow"]} />
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
                                    }}
                                  >
                                    {item.city}, {item.region}
                                  </span>

                                  <span
                                    className={[styles["btn-remove"], styles["btn-right"]].join(" ")}
                                    onClick={() => {
                                      deleteSpecificHistory(index);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={["fas", "minus-circle"]} />
                                  </span>
                                </DropdownItem>
                              );
                            })}
                            <DropdownItem divider />
                            <DropdownItem
                              className={styles["btn-last"]}
                              onClick={() => {
                                clearAllHistory();
                              }}
                            >
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
