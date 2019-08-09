import express from "express";
import Bundler from "parcel-bundler";
import path from "path";
import http from "http";
import SocketIOServer from "socket.io";

import initializeSocketIO from "./socket";

const app = express();
const port = 8080 || process.env.PORT;
const server = new http.Server(app);
const io = SocketIOServer(server);

const bundler = new Bundler(path.join(__dirname, "../src/client/index.html"));

// app.get("/", (request, response) => {
//   response.send("Well hello there!");
// });

initializeSocketIO(io);
app.use(bundler.middleware());

// app.listen(port, () => {
//   // tslint:disable-next-line:no-console
//   console.log(`server started at http://localhost:${port}`)
// });

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
