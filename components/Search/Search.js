import { useStoreState } from "easy-peasy";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "./Search.scss";

const search = props => {
  const city = useStoreState(state => state.location.locationCity);
  const state = useStoreState(state => state.location.locationState);

  const searchOptions = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" }
  };
  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.changed}
      onSelect={props.selected}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        const { onChange } = getInputProps({
          placeholder: `${city}, ${state}`
        });
        let readyStatus = "Loading";
        if (city === "") {
          readyStatus = "Checking Your Position";
        } else {
          readyStatus = "Search a City";
        }
        return (
          <div className={styles.search}>
            <input
              placeholder={`${readyStatus}`}
              value={props.address}
              onChange={onChange}
              className={[["form-control"], ["location-search-input"], styles["form-control"]].join(" ")}
            />
            <div className={[["list-group"], styles["list-group"]].join(" ")}>
              {loading && (
                <div>
                  <i className="fas fa-spinner fa-pulse" /> Loading...
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
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

export default search;
