import styles from "../WeatherSlider.module.scss";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import Swiper from "react-id-swiper";
import MicroModal from "react-micro-modal";
import { useState } from "react";
import {
  getDirection,
  getCondition,
  calculatePressure,
  formatAsPercentage,
  Moon
} from "../../../../utils/calculateWeather";
import { format } from "date-fns";
import fromUnixTime from "date-fns/fromUnixTime";

const hourlySlider = props => {
  const [swiper, updateSwiper] = useState(null);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  let slider = null;
  let sliderInitialize = null;

  sliderInitialize = props.weather.hourly.data.slice(0, 48).map((item, index) => {
    const backgroundCondition = {
      backgroundImage: `url(/weatherBackgrounds/${item.icon}.jpg)`
    };
    return (
      <div key={item.time} className={styles.slide}>
        <MicroModal
          modalClassName={styles.modal}
          disableFirstElementFocus={true}
          closeOnAnimationEnd={true}
          trigger={handleOpen => (
            <div
              onClick={handleOpen}
              target="_blank"
              className={[styles.slide, styles["slide-modal-btn"]].join(" ")}>
              <div className={styles.date}>
                {format(new Date(), "eee") === format(fromUnixTime(item.time), "eee")
                  ? format(fromUnixTime(item.time), "h a")
                  : format(fromUnixTime(item.time), "eee h a")}
              </div>
              <WeatherIcon condition={item.icon} color="white" />
              <div className={styles.temp}>{Math.round(item.temperature)} °</div>
              {getCondition(item.icon)}
            </div>
          )}
          children={handleClose => (
            <>
              <div className={styles["modal__top"]}>
                <div style={backgroundCondition} className={styles["modal__top__background"]} />
                <button className={styles["modal__top__close"]} onClick={handleClose}>
                  ×
                </button>
                <h2 className={styles.date}>
                  {format(new Date(), "eee") === format(fromUnixTime(item.time), "eee")
                    ? format(fromUnixTime(item.time), "h a")
                    : format(fromUnixTime(item.time), "eee h a")}
                </h2>
                <div className="row">
                  <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                    <div className={styles["modal__item"]}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                        <path d="M327.159 2.766a10.641 10.641 0 0 0-14.313 0c-4.642 4.186-110.889 101.292-160.228 213.839-5.318-1.867-11.44-3.266-19.355-3.266-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583A10.66 10.66 0 0 0 .002 224.006a10.66 10.66 0 0 0 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75 12 0 17.563 3.865 24.604 8.76 8.052 5.604 18.083 12.573 36.771 12.573 18.677 0 28.708-6.969 36.771-12.573 7.031-4.896 12.594-8.76 24.594-8.76a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-11.208 0-16.823-3.419-23.242-7.854 40.121-92.661 123.661-177.466 148.607-201.49 33.219 32.01 170.667 171.865 170.667 294.677 0 94.104-76.563 170.667-170.667 170.667-42.477 0-82.669-15.822-113.78-43.758 11.542-2.138 18.994-7.177 25.186-11.482 7.031-4.896 12.594-8.76 24.594-8.76 5.896 0 10.667-4.771 10.667-10.667s-4.771-10.667-10.667-10.667c-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-12 0-17.563-3.865-24.594-8.76-8.063-5.604-18.094-12.573-36.781-12.573-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75 12 0 17.563 3.865 24.604 8.76 4.345 3.023 9.414 6.355 15.961 8.865 36.6 42.996 89.655 67.708 146.174 67.708 105.865 0 192-86.135 192-192C512.003 171.641 334.701 9.589 327.159 2.766z" />
                        <path d="M10.669 362.672c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667zm122.594-21.333c-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c12 0 17.563 3.865 24.594 8.76 8.063 5.604 18.094 12.573 36.781 12.573 18.677 0 28.708-6.969 36.771-12.573 7.031-4.896 12.594-8.76 24.594-8.76 12.198 0 18.406 3.969 26.25 8.99 9.052 5.781 19.313 12.344 37.75 12.344a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-12.198 0-18.406-3.969-26.25-8.99-9.052-5.781-19.313-12.344-37.75-12.344-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-12 0-17.563-3.865-24.604-8.76-8.053-5.605-18.084-12.573-36.772-12.573zm0-64c-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583A10.66 10.66 0 0 0 .002 288.006a10.66 10.66 0 0 0 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667zm98.146 30.093c7.031-4.896 12.594-8.76 24.594-8.76 11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c18.676 0 28.707-6.969 36.77-12.573z" />
                      </svg>
                      <h4 className={styles["modal__item__title"]}>Humidity</h4>
                      {formatAsPercentage(item.humidity)}
                    </div>
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                    <div className={styles["modal__item"]}>
                      <svg
                        height="479pt"
                        viewBox="-31 0 479 479.874"
                        width="479pt"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M120.438 335.875c77.382 0 120-45.457 120-128 0-77.281-109.391-200.152-114.047-205.336a8.251 8.251 0 0 0-11.906 0C109.827 7.723.437 130.594.437 207.875c0 82.543 42.617 128 120 128zm0-315.793c22.902 26.879 104 126.36 104 187.793 0 51.094-18.047 112-104 112s-104-60.906-104-112c0-61.434 81.093-160.914 104-187.793zm224 331.793c45.757 0 72-30.535 72-83.793 0-50.008-63.45-118.75-66.145-121.656a8.24 8.24 0 0 0-11.711 0c-2.695 2.906-66.145 71.648-66.145 121.656 0 53.258 26.239 83.793 72 83.793zm0-187.922c15.43 17.953 56 68.547 56 104.129 0 44.984-18.84 67.793-56 67.793s-56-22.809-56-67.793c0-35.582 40.566-86.176 56-104.129zm-118 158.625c-2.04 2.313-50 57.09-50 93.297 0 40.672 20.414 64 56 64 35.582 0 56-23.328 56-64 0-36.207-47.961-90.984-50-93.297a8.265 8.265 0 0 0-12 0zm6 141.297c-26.536 0-40-16.152-40-48 0-21.746 25.03-57.145 40-75.586 14.976 18.402 40 53.809 40 75.586 0 31.848-13.465 48-40 48zm0 0" />
                        <path d="M103.637 303.836a8.005 8.005 0 0 0 8.793-7.563 8 8 0 0 0-7.192-8.359 58.61 58.61 0 0 1-42.746-21.824c-21.277-27.742-14.23-72.465-14.168-72.91a8.002 8.002 0 0 0-6.613-8.97 8.002 8.002 0 0 0-9.16 6.345c-.356 2.113-8.29 51.886 17.191 85.199a73.932 73.932 0 0 0 53.895 28.082zm232.801 16.039a55.696 55.696 0 0 0 39.128-16.855 47.815 47.815 0 0 0 8.758-40.465 7.998 7.998 0 1 0-15.773 2.64 32.819 32.819 0 0 1-5.137 27.414 39.825 39.825 0 0 1-26.976 11.266 8 8 0 0 0 0 16zm-108.426 112.84a9.181 9.181 0 0 1-5.274-5.613 9.184 9.184 0 0 1 .86-7.653c1.972-3.953.37-8.761-3.586-10.734-3.953-1.977-8.758-.371-10.735 3.582a25.185 25.185 0 0 0-1.718 19.89 25.197 25.197 0 0 0 13.3 14.887 8.003 8.003 0 0 0 10.739-3.586 8.003 8.003 0 0 0-3.586-10.734zm0 0" />
                      </svg>
                      <h4 className={styles["modal__item__title"]}>Precipitation</h4>
                      {formatAsPercentage(item.precipProbability)}
                    </div>
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                    <div className={styles["modal__item"]}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368 368">
                        <path d="M296 48c-39.704 0-72 32.304-72 72 0 4.416 3.576 8 8 8s8-3.584 8-8c0-30.88 25.128-56 56-56s56 25.12 56 56-25.128 56-56 56H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h288c39.704 0 72-32.304 72-72s-32.296-72-72-72z" />
                        <path d="M144 32c-30.88 0-56 25.12-56 56 0 4.416 3.584 8 8 8s8-3.584 8-8c0-22.056 17.944-40 40-40s40 17.944 40 40-17.944 40-40 40H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h136c30.88 0 56-25.12 56-56s-25.12-56-56-56zm136 192H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h272c22.056 0 40 17.944 40 40s-17.944 40-40 40-40-17.944-40-40c0-4.416-3.576-8-8-8s-8 3.584-8 8c0 30.88 25.128 56 56 56s56-25.12 56-56-25.128-56-56-56z" />
                      </svg>
                      <h4 className={styles["modal__item__title"]}>Wind Speed</h4>
                      {getDirection(item.windBearing)} {Math.round(item.windSpeed)} MPH
                    </div>
                  </div>
                  <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                    <div className={styles["modal__item"]}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                        <path d="M64.5 92.6c15.5 0 28-12.6 28-28s-12.6-28-28-28-28 12.6-28 28 12.5 28 28 28zm0-47.9c11 0 19.9 8.9 19.9 19.9 0 11-8.9 19.9-19.9 19.9s-19.9-8.9-19.9-19.9c0-11 8.9-19.9 19.9-19.9zM68.6 23.6V10.7c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1v12.9c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1zM60.4 105.6v12.9c0 2.3 1.8 4.1 4.1 4.1s4.1-1.8 4.1-4.1v-12.9c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1zM96.4 38.5l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8 0l-9.1 9.1c-1.6 1.6-1.6 4.2 0 5.8.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2zM23.5 105.6c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l9.1-9.1c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8 0l-9.1 9.1c-1.6 1.6-1.6 4.2 0 5.8zM122.5 64.6c0-2.3-1.8-4.1-4.1-4.1h-12.9c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1h12.9c2.2 0 4.1-1.8 4.1-4.1zM10.6 68.7h12.9c2.3 0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1H10.6c-2.3 0-4.1 1.8-4.1 4.1s1.9 4.1 4.1 4.1zM102.6 106.8c1 0 2.1-.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l9.1 9.1c.8.8 1.9 1.2 2.9 1.2zM38.4 38.5c1.6-1.6 1.6-4.2 0-5.8l-9.1-9.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l9.1 9.1c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2z" />
                      </svg>
                      <h4 className={styles["modal__item__title"]}>UV Index</h4>
                      {item.uvIndex}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["modal-body"]}>
                <p>{item.summary}</p>
                <ul>
                  <li>
                    <strong>Temperature</strong> <span>{Math.round(item.temperature)} °</span>
                  </li>
                  <li>
                    <strong>Feels Like</strong>{" "}
                    <span>{Math.round(item.apparentTemperature)} °</span>
                  </li>
                  <li>
                    <strong>Moon Phase</strong>{" "}
                    <span>
                      {
                        Moon.phase(
                          parseInt(format(fromUnixTime(item.time), "yyyy")),
                          parseInt(format(fromUnixTime(item.time), "M")),
                          parseInt(format(fromUnixTime(item.time), "d"))
                        ).name
                      }
                    </span>
                  </li>
                  <li>
                    <strong>Dew Point</strong> <span>{Math.round(item.dewPoint)} °</span>
                  </li>
                  <li>
                    <strong>Wind Gust</strong> <span>{Math.round(item.windGust)} mph</span>
                  </li>
                  {item.precipAccumulation && (
                    <li>
                      <strong>Snowfall Accumulation</strong> <span>{item.precipAccumulation}"</span>
                    </li>
                  )}
                  <li>
                    <strong>Cloud Cover</strong> <span>{formatAsPercentage(item.cloudCover)}</span>
                  </li>
                  <li>
                    <strong>Air Pressure</strong> <span>{calculatePressure(item.pressure)} in</span>
                  </li>
                  <li>
                    <strong>Ozone</strong> <span>{Math.round(item.ozone)} du</span>
                  </li>
                  <li>
                    <strong>Visibility</strong> <span>{Math.round(item.visibility)} mi</span>
                  </li>
                </ul>
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </>
          )}
        />
      </div>
    );
  });

  const params = {
    getSwiper: updateSwiper,
    loop: false,
    slidesPerView: 7,
    spaceBetween: 5,
    shouldSwiperUpdate: true,
    breakpoints: {
      200: {
        slidesPerView: 3
      },
      400: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 5
      },
      1024: {
        slidesPerView: 5
      },
      1400: {
        slidesPerView: 7
      }
    }
  };

  initializeSlider(params);

  function initializeSlider(params) {
    slider = <Swiper {...params}>{sliderInitialize}</Swiper>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles["slider-arrows"]}>
        <button onClick={goPrev}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492"><path d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"/></svg>
        </button>
        <button onClick={goNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004"><path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"/></svg>
        </button>
      </div>
      {slider}
    </div>
  );
};

export default hourlySlider;
