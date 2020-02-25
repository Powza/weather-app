import styles from './Alerts.scss';
import MicroModal from 'react-micro-modal';
import 'react-micro-modal/dist/index.css';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';

const alerts = props => {
  let alert = null;
  if (props.alert) {
    alert = props.alert.map((item, index) => {
      return (
        <span key={index}>
          <MicroModal
            modalClassName={styles['modal']}
            disableFirstElementFocus={true}
            closeOnAnimationEnd={true}
            trigger={handleOpen => (
              <a
                onClick={handleOpen}
                target="_blank"
                className={[[`${item.severity}`], styles['alert-link']].join(
                  ' '
                )}
              >
                <i className="fas fa-exclamation-triangle" /> {item.title}
              </a>
            )}
            children={handleClose => (
              <>
                <div
                  className={[[`${item.severity}`], styles['modal__top']].join(
                    ' '
                  )}
                >
                  <button
                    className={styles['modal__top__close']}
                    onClick={handleClose}
                  >
                    ×
                  </button>
                  <h2>{item.title}</h2>
                </div>
                <div className={styles['modal-body']}>
                  <p>
                    Expires:{' '}
                    {format(
                      fromUnixTime(item.expires),
                      'eeee do yyyy, hh:mm:ss a'
                    )}
                  </p>
                  <p>{item.description}</p>
                  <button onClick={handleClose} className="btn btn-secondary">
                    Close
                  </button>
                </div>
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
