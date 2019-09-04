export const GA_TRACKING_ID = "GTM-WPPW5ZR";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

const style = {
  display: "none",
  visibility: "hidden"
};
export const GtagNoscript = props => {
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
          height="0"
          width="0"
          style={style}
        />
      </noscript>
    </>
  );
};
