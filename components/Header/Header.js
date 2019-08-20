import { useState } from "react";
import styles from "./Header.scss";
import { geocodeByAddress } from "react-places-autocomplete";
import { useStoreActions } from "easy-peasy";
import Search from "../Search/Search";
import { fetchWeather } from "../../api/APIUtils";

const header = props => {
  const [search, setSearch] = useState({
    address: ""
  });

  const setWeather = useStoreActions(actions => actions.weather.setWeatherData);
  const setLatitude = useStoreActions(actions => actions.location.setLocationLatitude);
  const setLongitude = useStoreActions(actions => actions.location.setLocationLongitude);
  const setCity = useStoreActions(actions => actions.location.setLocationCity);
  const setState = useStoreActions(actions => actions.location.setLocationState);

  const handleSearchChange = address => {
    setSearch({ address });
  };
  const handleSearchSelect = address => {
    geocodeByAddress(address)
      .then(results => results[0])
      .then(data => {
        const dataAddress = data.address_components;
        const lat = data.geometry.location.lat();
        const lng = data.geometry.location.lng();

        setLatitude(lat);
        setLongitude(lng);
        setSearch({ address: "" });
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
  return (
    <header className={styles["header"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4 mx-auto">
            <Search address={search.address} changed={handleSearchChange} selected={handleSearchSelect} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
