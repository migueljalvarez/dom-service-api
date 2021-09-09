import http from "http";
import app from "./app";
import config from "./config/config";
const server = http.createServer(app);

server.listen(config.app.port);
server.on("listening", () => {
  console.log(`Server on listenning on ${config.app.port}`);
});
