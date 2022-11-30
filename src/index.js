const http = require("http");
const handler = require("./handler.js");

const PORT = process.env.PORT || 3005;
// This is whatever
http
  .createServer(handler)
  .listen(PORT, () => console.log(`server is running at  ${PORT}`));
