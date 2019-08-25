import styles from "./Footer.scss";

const footer = props => {
  return (
    <footer className={styles["footer"]}>
      <div className="container-fluid">
        Weather App by <a href="https://tinyminute.com/">Tiny Minute</a>
        <br />
        View Source on{" "}
        <a href="https://github.com/Powza/weather-app">
          <i className="fab fa-github" /> GitHub
        </a>{" "}
        - Weather Data by <a href="https://darksky.net/dev">Dark Sky</a>
      </div>
    </footer>
  );
};

export default footer;
