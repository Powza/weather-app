import styles from "./Footer.module.scss";

const footer = props => {
  return (
    <footer className={styles["footer"]}>
      <div className="container-fluid">
        Weather App by <a href="https://tinyminute.com/">Tiny Minute</a>
        <br />
        View Source on <a href="https://github.com/Powza/weather-app"> GitHub</a> - Powered by{" "}
        <a href="https://darksky.net/poweredby/">Dark Sky</a>
      </div>
    </footer>
  );
};

export default footer;
