import styles from "./Background.scss";

const weatherBackground = props => {
  let image = null;
  if (props.condition) {
    const divStyle = {
      backgroundImage: `url('/static/weather-condition/${props.condition}.jpg')`
    };
    image = <div className={styles["background"]} style={divStyle} />;
  }

  return <React.Fragment>{image}</React.Fragment>;
};

export default weatherBackground;
