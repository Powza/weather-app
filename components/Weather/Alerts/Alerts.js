import styles from "./Alerts.scss";
import MicroModal from "react-micro-modal";
import "react-micro-modal/dist/index.css";

const alerts = props => {
  let moment = require("moment");
  let alert = null;
  if (props.alert) {
    alert = props.alert.map((item, index) => {
      return (
        <span key={index}>
          <MicroModal
            modalClassName={styles["alert-modal"]}
            disableFirstElementFocus={true}
            closeOnAnimationEnd={true}
            trigger={handleOpen => (
              <a
                onClick={handleOpen}
                target="_blank"
                className={[[`${item.severity}`], styles["alert-link"]].join(" ")}
              >
                <i className="fas fa-exclamation-triangle" /> {item.title}
              </a>
            )}
            children={handleClose => (
              <>
                <h3>{item.title}</h3>
                <p>Expires: {moment.unix(item.expires).format("MMMM Do YYYY, h:mm:ss a")}</p>
                <p>{item.description}</p>
                <button onClick={handleClose} className="btn btn-secondary">
                  Close
                </button>
              </>
            )}
          />
        </span>
      );
    });
  }

  return <>{alert}</>;
};

export default alerts;
