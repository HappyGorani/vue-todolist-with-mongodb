const express = require("express");
const cors = require("cors");

const db = require("./database/mongodb.config");
const errorHandler = require("./middlewares/errorHandler.middleware");
const todolistRouter = require("./routes/todolist.route");

const app = express();

app.use(cors());

app.use(express.json());

app.use(todolistRouter);

app.use(errorHandler);
db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("DB연결에 실패했습니다.");
  });
