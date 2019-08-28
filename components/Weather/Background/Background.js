import styles from "./Background.scss";

const weatherBackground = props => {
  let image = null;
  if (props.condition) {
    const divStyle = {
      backgroundImage: `url('/static/weatherBackgrounds/${props.condition}.jpg')`
    };
    image = <div className={styles["background"]} style={divStyle} />;
  }

  return image;
};

export default weatherBackground;
