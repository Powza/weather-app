import styles from "./WeatherVideo.scss";

const weatherVideo = props => {
  let video = null;
  if (props.condition) {
    video = (
      <div className={styles["weather-video"]}>
        <video autoPlay muted loop>
          <source src={`/static/weather-condition/${props.condition}.mp4`} type="video/mp4" />
        </video>
      </div>
    );
  } else {
    video = "Error loading data";
  }

  return <React.Fragment>{video}</React.Fragment>;
};

export default weatherVideo;
