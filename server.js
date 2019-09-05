const express = require("express");
const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const request = require("request");

const helmet = require("helmet");
const hostValidation = require("host-validation");
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
      var dsURL = "https://api.darksky.net/forecast/";
      var dsSecret = process.env.DARK_SKY_API_KEY;
      var dsSettings = "?exclude=minutely";
      var url = dsURL + dsSecret + "/" + req.params.lat + "," + req.params.lng + dsSettings;
      req.pipe(request(url)).pipe(res);
    });

    server.get("/api/google/:query", (req, res) => {
      var gURL = "https://maps.googleapis.com/maps/api/js";
      var gSecret = "?key=" + process.env.GOOGLE_MAPS_API_PLACES_KEY;
      var url = gURL + gSecret + req.params.query;
      req.pipe(request(url)).pipe(res);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
