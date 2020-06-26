import "reflect-metadata";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm";

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const indicatorRoutes = require("./routes/indicator");
const markerRoutes = require("./routes/marker");
const userRoutes = require("./routes/users");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;

app.engine("pug", require("pug").__express);
app.set("port", PORT);
app.set("../views", path.join(__dirname, "views"));
app.set("view engine", "pug");

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

//const args = (route.method === 'post' && route.path === '/markers') ? (route.path, upload.any(), (request: Request, response: Response, next: Function) : (route.path, (request: Request, response: Response, next: Function);

const options: ConnectionOptions = {
  type: "sqlite",
  logging: true,
  database: "db/mydb.db",
  synchronize: true,
  entities: ['build/entity/**/*.js'],
};
//entities: ['build/entity/**/*.js'],
createConnection(options).then(async connection => {
  app.use("/api/indicators/", indicatorRoutes);
  app.use("/api/markers/", markerRoutes);
  app.use("/api/users/", userRoutes);
});

export default app;
