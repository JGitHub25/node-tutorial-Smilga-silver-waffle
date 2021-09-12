const http = require("http");
const { readFileSync } = require("fs");

const homeHtml = readFileSync("./navbar-app/index.html");
const homeStyle = readFileSync("./navbar-app/styles.css");
const homeLogo = readFileSync("./navbar-app/logo.svg");
const homeJS = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homeHtml);
    res.end("<h3>Server running wild like a tail!</h3>");
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyle);
    res.end();
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeLogo);
    res.end();
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeJS);
    res.end();
  }
});

server.listen(5000, () => {
  const { address, port } = server.address();
  console.log(address);
  console.log(port);
  console.log(`Server is listening on: http://${address}:${port}`);
});
