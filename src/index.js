import http from "http";
import app from "./app";
const server = http.createServer(app);
const port = 4000;

server.listen(port);

server.on("listening", () => {
  console.log(`Server on listenning on ${port}`);
});
