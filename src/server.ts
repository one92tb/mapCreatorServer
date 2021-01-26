import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm";
import indicatorRoutes from "./routes/indicator";
import markerRoutes from "./routes/marker";
import userRoutes from "./routes/users";

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

//const indicatorRoutes = require("./routes/indicator");
//const markerRoutes = require("./routes/marker");
//const userRoutes = require("./routes/users");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;

app.engine("pug", require("pug").__express);
app.set("port", PORT);
//app.set("../views", path.join(__dirname, "views"));
//app.set("view engine", "pug");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cookieParser());
app.use(express.static("public"));
app.use(flash());

const options: ConnectionOptions = {
  type: "sqlite",
  logging: true,
  database: "db/mydb.db",
  synchronize: true,
  entities: ['src/entity/**/*.ts'],
};

createConnection(options).then(async connection => {

  app.use((req, res) => {
    if (req.method === "OPTIONS") {
      return res.status(200).json({});
    }
  });

  app.use("/api/indicators/", indicatorRoutes);
  app.use("/api/markers/", markerRoutes);
  app.use("/api/users/", userRoutes);
});


const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`)
});
