import styles from "./Background.module.scss";

const weatherBackground = props => {
  let image = null;
  if (props.condition) {
    const divStyle = {
      backgroundImage: `url('/weatherBackgrounds/${props.condition}.jpg')`
    };
    image = <div className={styles["background"]} style={divStyle} />;
  }

  return image;
};

export default weatherBackground;
