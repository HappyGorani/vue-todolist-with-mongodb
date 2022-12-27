const fs = require("fs");
const cors = require("cors");
const express = require("express");
const httpPort = 2080;
const httpsPort = 2443;
const db = require("./database/mongodb.config");
const errorHandler = require("./middlewares/errorHandler.middleware");
const todolistRouter = require("./routes/todolist.route");

const key = fs.readFileSync("SSL/cert.key");
const cert = fs.readFileSync("SSL/cert.crt");

const app = express();
const http = require("http").createServer(app);
const https = require("https").createServer({ key, cert }, app);
const socketIo = require("socket.io");
const io = socketIo(https, {
  cors: {
    origin: "https://xn--3h3bz1pi5a.me",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.json());
app.use(todolistRouter);
app.use(errorHandler);

db.initDb()
  .then(function () {
    http.listen(httpPort, (error) => {
      if (error) throw error;
      console.log("http on");
    });
    https.listen(httpsPort, (error) => {
      if (error) throw error;
      console.log("https on");
    });
    io.on("connection", function (socket) {
      console.log(socket.id, "연결됨");

      socket.on("msg", function (data) {
        socket.emit("msg", { id: (socket.id).slice(0,5), data: data });
        socket.broadcast.emit("msg", { id: (socket.id).slice(0,5), data: data });
      });
    });
  })

  .catch(function (error) {
    console.log(error);
  });
