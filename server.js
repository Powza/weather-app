const express = require("express");
const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const request = require("request");

const helmet = require("helmet");
//const hostValidation = require("host-validation");
const rateLimit = require("express-rate-limit");

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use(hostValidation({ hosts: ["localhost:3000"], referers: ["http://localhost:3000/"] }));
    server.use(helmet());
    const apiLimiter = rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 30,
      message: "Too many weather requests from this IP, please try again in 5 minutes."
    });
    // server.use(limiter);
    server.use("/api/darkSky/", apiLimiter);

    server.get("/api/darkSky/:lat,:lng", (req, res) => {
      var endpoint = "https://api.darksky.net/forecast/";
      var key = process.env.DARK_SKY_API_KEY;
      var settings = "?extend=hourly&exclude=minutely";
      var url = endpoint + key + "/" + req.params.lat + "," + req.params.lng + settings;
      req.pipe(request(url)).pipe(res);
    });

    server.get("/api/google/:query", (req, res) => {
      var endpoint = "https://maps.googleapis.com/maps/api/js";
      var key = "?key=" + process.env.GOOGLE_MAPS_API_PLACES_KEY;
      var url = endpoint + key + req.params.query;
      req.pipe(request(url)).pipe(res);
    });

    server.get("/api/ipinfo/:ip", (req, res) => {
      var endpoint = "https://ipinfo.io/";
      var key = "?token=" + process.env.IPINFO_API_KEY;
      var url = endpoint + req.params.ip + key;
      req.pipe(request(url)).pipe(res);
    });

    server.get("/api/ipdata/:ip", (req, res) => {
      var endpoint = "https://api.ipdata.co/";
      var key = "?api-key=" + process.env.IPDATA_API_KEY;
      var settings = "&fields=country_code,latitude,longitude,city,region";
      var url = endpoint + req.params.ip + key + settings;
      req.pipe(request(url)).pipe(res);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, "0.0.0.0", err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
