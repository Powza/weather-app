//const { createServer } = require("https");
//const { parse } = require("url");
//const { readFileSync } = require("fs");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

/*const httpsOptions = {
  key: readFileSync("./security/cert.key"),
  cert: readFileSync("./security/cert.pem")
};*/

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    /*createServer(
      httpsOptions,
      (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      },
      server
    ).listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });*/
    server.listen(port, "0.0.0.0", err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
