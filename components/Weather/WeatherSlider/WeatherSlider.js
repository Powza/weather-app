import styles from "../WeatherSlider/WeatherSlider.scss";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import Swiper from "react-id-swiper";
import MicroModal from "react-micro-modal";
import "react-micro-modal/dist/index.css";
import { useState } from "react";
import Units from "../Units/Units";
import { getDirection } from "../../../utils/getDirection";
import { getCondition } from "../../../utils/getCondition";
import Moon from "../../../utils/getMoonPhase";
import formatAsPercentage from "../../../utils/formateAsPercentage";

const weatherSlider = props => {
  let slider = null;
  let sliderInitialize = null;

  function template() {
    let moment = require("moment");
    if (props.day) {
      sliderInitialize = props.day.slice(0, 8).map((item, index) => {
        const [openModal, setModalOpen] = useState(false);
        const backgroundCondition = {
          backgroundImage: `url(/static/weather-condition/${item.icon}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        };
        return (
          <div key={item.time}>
            <div
              className={[styles.slide, styles["slide-modal-btn"]].join(" ")}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {moment().format("dddd") === moment.unix(item.time).format("dddd") ? (
                <div className={styles.date}>Today</div>
              ) : (
                <div className={styles.date}>{moment.unix(item.time).format("dddd")}</div>
              )}
              <WeatherIcon condition={item.icon} />
              <div className={styles.temp}>{Math.round(item.temperatureHigh)} °</div>
              <span>
                <i className="fas fa-arrow-down" /> {Math.round(item.temperatureLow)} °
              </span>
            </div>
            <>
              <MicroModal
                open={openModal}
                modalClassName={styles.modal}
                handleClose={() => setModalOpen(false)}
                closeOnAnimationEnd={true}
                containerStyles={{ padding: "0", borderRadius: "0", maxWidth: "600px", width: "100%" }}
                disableFirstElementFocus={true}
                children={handleClose => (
                  <div>
                    <div className={styles["modal__top"]}>
                      <div style={backgroundCondition} className={styles["modal__top__background"]} />
                      <button className={styles["modal__top__close"]} onClick={handleClose}>
                        ×
                      </button>
                      <h2>{moment.unix(item.time).format("dddd, MMMM Do")}</h2>
                      <div className="row">
                        <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                          <div className={styles["modal__item"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
                              <path d="M327.159 2.766a10.641 10.641 0 0 0-14.313 0c-4.642 4.186-110.889 101.292-160.228 213.839-5.318-1.867-11.44-3.266-19.355-3.266-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583A10.66 10.66 0 0 0 .002 224.006a10.66 10.66 0 0 0 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75 12 0 17.563 3.865 24.604 8.76 8.052 5.604 18.083 12.573 36.771 12.573 18.677 0 28.708-6.969 36.771-12.573 7.031-4.896 12.594-8.76 24.594-8.76a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-11.208 0-16.823-3.419-23.242-7.854 40.121-92.661 123.661-177.466 148.607-201.49 33.219 32.01 170.667 171.865 170.667 294.677 0 94.104-76.563 170.667-170.667 170.667-42.477 0-82.669-15.822-113.78-43.758 11.542-2.138 18.994-7.177 25.186-11.482 7.031-4.896 12.594-8.76 24.594-8.76 5.896 0 10.667-4.771 10.667-10.667s-4.771-10.667-10.667-10.667c-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-12 0-17.563-3.865-24.594-8.76-8.063-5.604-18.094-12.573-36.781-12.573-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75 12 0 17.563 3.865 24.604 8.76 4.345 3.023 9.414 6.355 15.961 8.865 36.6 42.996 89.655 67.708 146.174 67.708 105.865 0 192-86.135 192-192C512.003 171.641 334.701 9.589 327.159 2.766z" />
                              <path d="M10.669 362.672c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667zM133.263 341.339c-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c12 0 17.563 3.865 24.594 8.76 8.063 5.604 18.094 12.573 36.781 12.573 18.677 0 28.708-6.969 36.771-12.573 7.031-4.896 12.594-8.76 24.594-8.76 12.198 0 18.406 3.969 26.25 8.99 9.052 5.781 19.313 12.344 37.75 12.344a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-12.198 0-18.406-3.969-26.25-8.99-9.052-5.781-19.313-12.344-37.75-12.344-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-12 0-17.563-3.865-24.604-8.76-8.053-5.605-18.084-12.573-36.772-12.573zM133.263 277.339c-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583A10.66 10.66 0 0 0 .002 288.006a10.66 10.66 0 0 0 10.667 10.667c11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667zM231.409 307.432c7.031-4.896 12.594-8.76 24.594-8.76 11.969 0 17.521 3.865 24.542 8.75 8.042 5.604 18.063 12.583 36.729 12.583 18.677 0 28.708-6.979 36.76-12.583 7.031-4.885 12.583-8.75 24.563-8.75a10.66 10.66 0 0 0 10.667-10.667 10.66 10.66 0 0 0-10.667-10.667c-18.677 0-28.698 6.969-36.75 12.573-7.031 4.896-12.583 8.76-24.573 8.76-11.969 0-17.521-3.865-24.542-8.75-8.042-5.604-18.063-12.583-36.729-12.583-18.687 0-28.719 6.969-36.781 12.573-7.031 4.896-12.594 8.76-24.583 8.76-5.896 0-10.667 4.771-10.667 10.667s4.771 10.667 10.667 10.667c18.676 0 28.707-6.969 36.77-12.573z" />
                            </svg>
                            <h4 className={styles["modal__item__title"]}>Humidity</h4>
                            {formatAsPercentage(item.humidity)}
                          </div>
                        </div>
                        <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                          <div className={styles["modal__item"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196.121 196.121">
                              <path d="M94.923 137.827c-1.814-16.317-16.294-29.07-33.83-29.07-13.905 0-26.2 7.957-31.431 20.058h-.153C13.236 128.816 0 141.912 0 158.011c0 16.098 13.236 29.195 29.509 29.195.282 0 .564-.004.843-.01.094.007.192.01.286.01h63.164c.219 0 .435-.021.648-.063 13.062-.905 23.223-11.655 23.223-24.675-.001-12.892-10.016-23.512-22.75-24.641zm-1.309 42.223c-.087.007-.174.014-.261.024h-62.29a3.012 3.012 0 0 0-.582-.021c-12.71.487-23.349-9.555-23.349-22.042 0-12.167 10.039-22.063 22.377-22.063.749 0 1.487.035 2.218.104 1.619.188 3.19-.846 3.719-2.417 3.552-10.614 13.856-17.746 25.646-17.746 14.827 0 26.89 11.397 26.89 25.434 0 .975.4 1.908 1.104 2.58s1.643 1.041 2.629.982c.317-.014.637-.024.961-.024 9.851 0 17.864 7.898 17.864 17.606 0 9.378-7.434 17.102-16.926 17.583zM101.651 87.3c.219.042.439.063.665.063h63.168c.094 0 .191-.004.286-.01.278.007.561.01.843.01 16.273 0 29.508-13.097 29.508-29.195 0-16.099-13.236-29.195-29.508-29.195h-.153c-5.23-12.101-17.526-20.058-31.43-20.058-17.526 0-32.002 12.741-33.826 29.07-12.735 1.128-22.753 11.749-22.753 24.64-.003 13.016 10.148 23.764 23.2 24.675zm1.793-42.281c.324 0 .644.01.961.024a3.58 3.58 0 0 0 2.629-.996 3.6 3.6 0 0 0 1.104-2.594c0-14.009 12.062-25.406 26.89-25.406 11.791 0 22.095 7.132 25.647 17.746.526 1.578 2.117 2.556 3.719 2.417a23.19 23.19 0 0 1 2.218-.104c12.338 0 22.377 9.897 22.377 22.063-.004 12.487-10.69 22.596-23.349 22.042-.052-.004-.108-.004-.16-.004-.139 0-.275.007-.411.024h-62.298c-.087-.01-.178-.017-.265-.024-9.493-.481-16.927-8.204-16.927-17.582.001-9.708 8.014-17.606 17.865-17.606zM63.151 86.464l-35.007 4.649a3.564 3.564 0 0 0-3.064 4.004 3.565 3.565 0 0 0 4.005 3.065L68.109 93a3.567 3.567 0 0 0 2.977-4.45l-10.05-37.8a3.572 3.572 0 0 0-4.363-2.532 3.57 3.57 0 0 0-2.532 4.363l9.01 33.883z" />
                              <path d="M3.563 83.951c.157 0 .313-.01.474-.031l39.029-5.181a3.567 3.567 0 0 0 2.977-4.45l-10.05-37.8c-.505-1.905-2.459-3.023-4.363-2.532a3.57 3.57 0 0 0-2.532 4.363l9.009 33.882L3.096 76.85a3.564 3.564 0 0 0-3.064 4.004 3.565 3.565 0 0 0 3.531 3.097zM125.922 116.941l35.011-4.649a3.564 3.564 0 0 0 3.064-4.004 3.563 3.563 0 0 0-4.004-3.064l-39.029 5.181a3.567 3.567 0 0 0-2.977 4.45l10.05 37.796a3.565 3.565 0 0 0 4.363 2.532 3.57 3.57 0 0 0 2.532-4.363l-9.01-33.879z" />
                              <path d="M184.952 126.618l-39.029 5.181a3.567 3.567 0 0 0-2.977 4.45l10.05 37.796a3.565 3.565 0 0 0 4.363 2.532 3.57 3.57 0 0 0 2.532-4.363l-9.009-33.879 35.011-4.649a3.564 3.564 0 0 0 3.064-4.004c-.258-1.952-2.051-3.314-4.005-3.064z" />
                            </svg>
                            <h4 className={styles["modal__item__title"]}>Air Pressure</h4>
                            {Math.round(item.pressure)} mb
                          </div>
                        </div>
                        <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                          <div className={styles["modal__item"]}>
                            <svg
                              height="479pt"
                              viewBox="-31 0 479 479.874"
                              width="479pt"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M120.438 335.875c77.382 0 120-45.457 120-128 0-77.281-109.391-200.152-114.047-205.336a8.251 8.251 0 0 0-11.906 0C109.827 7.723.437 130.594.437 207.875c0 82.543 42.617 128 120 128zm0-315.793c22.902 26.879 104 126.36 104 187.793 0 51.094-18.047 112-104 112s-104-60.906-104-112c0-61.434 81.093-160.914 104-187.793zm0 0M344.438 351.875c45.757 0 72-30.535 72-83.793 0-50.008-63.45-118.75-66.145-121.656a8.24 8.24 0 0 0-11.711 0c-2.695 2.906-66.145 71.648-66.145 121.656 0 53.258 26.239 83.793 72 83.793zm0-187.922c15.43 17.953 56 68.547 56 104.129 0 44.984-18.84 67.793-56 67.793s-56-22.809-56-67.793c0-35.582 40.566-86.176 56-104.129zm0 0M226.438 322.578c-2.04 2.313-50 57.09-50 93.297 0 40.672 20.414 64 56 64 35.582 0 56-23.328 56-64 0-36.207-47.961-90.984-50-93.297a8.265 8.265 0 0 0-12 0zm6 141.297c-26.536 0-40-16.152-40-48 0-21.746 25.03-57.145 40-75.586 14.976 18.402 40 53.809 40 75.586 0 31.848-13.465 48-40 48zm0 0" />
                              <path d="M103.637 303.836a8.005 8.005 0 0 0 8.793-7.563 8 8 0 0 0-7.192-8.359 58.61 58.61 0 0 1-42.746-21.824c-21.277-27.742-14.23-72.465-14.168-72.91a8.002 8.002 0 0 0-6.613-8.97 8.002 8.002 0 0 0-9.16 6.345c-.356 2.113-8.29 51.886 17.191 85.199a73.932 73.932 0 0 0 53.895 28.082zm0 0M336.438 319.875a55.696 55.696 0 0 0 39.128-16.855 47.815 47.815 0 0 0 8.758-40.465 7.998 7.998 0 1 0-15.773 2.64 32.819 32.819 0 0 1-5.137 27.414 39.825 39.825 0 0 1-26.976 11.266 8 8 0 0 0 0 16zm0 0M228.012 432.715a9.181 9.181 0 0 1-5.274-5.613 9.184 9.184 0 0 1 .86-7.653c1.972-3.953.37-8.761-3.586-10.734-3.953-1.977-8.758-.371-10.735 3.582a25.185 25.185 0 0 0-1.718 19.89 25.197 25.197 0 0 0 13.3 14.887 8.003 8.003 0 0 0 10.739-3.586 8.003 8.003 0 0 0-3.586-10.734zm0 0" />
                            </svg>
                            <h4 className={styles["modal__item__title"]}>Precipitation</h4>
                            {formatAsPercentage(item.precipProbability)}
                          </div>
                        </div>
                        <div className="col-6 col-xs-6 col-sm-6 col-md-3">
                          <div className={styles["modal__item"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368 368">
                              <path d="M296 48c-39.704 0-72 32.304-72 72 0 4.416 3.576 8 8 8s8-3.584 8-8c0-30.88 25.128-56 56-56s56 25.12 56 56-25.128 56-56 56H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h288c39.704 0 72-32.304 72-72s-32.296-72-72-72z" />
                              <path d="M144 32c-30.88 0-56 25.12-56 56 0 4.416 3.584 8 8 8s8-3.584 8-8c0-22.056 17.944-40 40-40s40 17.944 40 40-17.944 40-40 40H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h136c30.88 0 56-25.12 56-56s-25.12-56-56-56zM280 224H8c-4.416 0-8 3.584-8 8s3.584 8 8 8h272c22.056 0 40 17.944 40 40s-17.944 40-40 40-40-17.944-40-40c0-4.416-3.576-8-8-8s-8 3.584-8 8c0 30.88 25.128 56 56 56s56-25.12 56-56-25.128-56-56-56z" />
                            </svg>
                            <h4 className={styles["modal__item__title"]}>Wind Speed</h4>
                            {Math.round(item.windSpeed)} MPH
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles["modal-body"]}>
                      <p>{item.summary}</p>
                      <ul>
                        <li>
                          <strong>Temperature</strong>{" "}
                          <span>
                            <i className="fas fa-arrow-down" /> {Math.round(item.temperatureLow)} ° /{" "}
                            <i className="fas fa-arrow-up" /> {Math.round(item.temperatureHigh)} °
                          </span>
                        </li>
                        <li>
                          <strong>Sunrise</strong> <span>{moment.unix(item.sunriseTime).format("h:mm a")}</span>
                        </li>
                        <li>
                          <strong>Sunset</strong> <span>{moment.unix(item.sunsetTime).format("h:mm a")}</span>
                        </li>
                        <li>
                          <strong>Moon Phase</strong>{" "}
                          <span>
                            {
                              Moon.phase(
                                moment.unix(item.time).format("YYYY"),
                                moment.unix(item.time).format("M") + 1,
                                moment.unix(item.time).format("D")
                              ).name
                            }{" "}
                            (
                            {
                              Moon.phase(
                                moment.unix(item.time).format("YYYY"),
                                moment.unix(item.time).format("M") + 1,
                                moment.unix(item.time).format("D")
                              ).phase
                            }
                            )
                          </span>
                        </li>
                        <li>
                          <strong>Dew Point</strong> <span>{Math.round(item.dewPoint)} °</span>
                        </li>
                        <li>
                          <strong>Wind Gust</strong> <span>{Math.round(item.windGust)} MPH</span>
                        </li>
                        <li>
                          <strong>Wind Direction</strong>{" "}
                          <span>
                            {getDirection(item.windBearing)} ({item.windBearing} °)
                          </span>
                        </li>
                        <li>
                          <strong>Cloud Cover</strong> <span>{formatAsPercentage(item.cloudCover)}</span>
                        </li>
                        <li>
                          <strong>UV Index</strong>{" "}
                          <span>
                            {item.uvIndex} at {moment.unix(item.uvIndexTime).format("h:mm a")}
                          </span>
                        </li>
                        <li>
                          <strong>Ozone</strong> <span>{Math.round(item.ozone)} DU</span>
                        </li>
                        <li>
                          <strong>Visibility</strong> <span>{Math.round(item.visibility)} mi</span>
                        </li>
                      </ul>
                      <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              />
            </>
          </div>
        );
      });
    } else if (props.hour) {
      sliderInitialize = props.hour.slice(1, 24).map((item, index) => {
        return (
          <div key={item.time} className={styles.slide}>
            <div className={styles.date}>{moment.unix(item.time).format("ddd h a")}</div>
            <WeatherIcon condition={item.icon} />
            <div className={styles.temp}>{Math.round(item.temperature)} °</div>
            {getCondition(item.icon)}
          </div>
        );
      });
    }
  }
  if (props.day) {
    template();
    const params = {
      loop: false,
      slidesPerView: 7,
      spaceBetween: 5,
      rebuildOnUpdate: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      renderPrevButton: () => (
        <button className="swiper-button-prev swiper-btn">
          <i className="fas fa-chevron-left" />
        </button>
      ),
      renderNextButton: () => (
        <button className="swiper-button-next swiper-btn">
          <i className="fas fa-chevron-right" />
        </button>
      ),
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        640: {
          slidesPerView: 3
        },
        320: {
          slidesPerView: 1
        }
      }
    };
    initializeSlider(params);
  } else if (props.hour) {
    template();
    const params = {
      loop: false,
      slidesPerView: 8,
      spaceBetween: 5,
      rebuildOnUpdate: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      renderPrevButton: () => (
        <button className="swiper-button-prev swiper-btn">
          <i className="fas fa-chevron-left" />
        </button>
      ),
      renderNextButton: () => (
        <button className="swiper-button-next swiper-btn">
          <i className="fas fa-chevron-right" />
        </button>
      ),
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        640: {
          slidesPerView: 3
        },
        320: {
          slidesPerView: 1
        }
      }
    };
    initializeSlider(params);
  }

  function initializeSlider(params) {
    slider = <Swiper {...params}>{sliderInitialize}</Swiper>;
  }

  return <div className={styles.slider}>{slider}</div>;
};

export default weatherSlider;
