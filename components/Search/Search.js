import { useEffect } from "react";
import { useIsMount } from "../../utils/useIsMount";
import { useStoreState } from "easy-peasy";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "./Search.module.scss";

const search = props => {
  const coords = useStoreState(state => state.location.locationLatitude);
  const city = useStoreState(state => state.location.locationCity);
  const state = useStoreState(state => state.location.locationState);
  const weather = useStoreState(state => state.weather.weatherData);
  const isMount = useIsMount();

  const searchOptions = {
    types: ["(regions)"]
  };

  useEffect(() => {
    if (isMount) {
      if ("google" in window && typeof google === "object" && typeof google.maps === "object") {
        window.myCallbackFunc = function() {};
      } else {
        const script = document.createElement("script");
        script.src = `/api/google/&libraries=places&callback=myCallbackFunc`;
        script.id = "googleapis";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  });

  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.changed}
      onSelect={props.selected}
      searchOptions={searchOptions}
      googleCallbackName="myCallbackFunc">
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        const { onChange } = getInputProps({
          placeholder: `${city}, ${state}`
        });

        let readyStatus = "Loading";

        if (coords === "") {
          readyStatus = "Checking Your Position..";
        }
        if (coords !== "" && weather === "") {
          readyStatus = "Loading Weather Data...";
        }
        if (weather !== "") {
          readyStatus = "Search location, zip...";
        }

        return (
          <>
            <input
              placeholder={`${readyStatus}`}
              value={props.address}
              onChange={onChange}
              className={[["form-control"], ["location-search-input"], styles["form-control"]].join(
                " "
              )}
            />
            <div className={[["list-group"], styles["list-group"]].join(" ")}>
              {loading && (
                <div className="list-group-item disabled" aria-disabled="true">
                  Loading Results...
                </div>
              )}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "list-group-item list-group-item-action active"
                  : "list-group-item list-group-item-action";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default search;
