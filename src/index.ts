import "reflect-metadata";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { ConnectionOptions } from "typeorm";
import { getManager, getRepository } from "typeorm";
import { Marker } from "./entity/Marker";
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const jwt = require("express-jwt");

import { routes } from "./routes/index";

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".png");
  }
});

const upload = multer({ storage: storage });

//const args = (route.method === 'post' && route.path === '/markers') ? (route.path, upload.any(), (request: Request, response: Response, next: Function) : (route.path, (request: Request, response: Response, next: Function);

const options: ConnectionOptions = {
  type: "sqlite",
  logging: true,
  database: "db/mydb.db",
  synchronize: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

createConnection(options).then(async connection => {
  routes.forEach(route => {
    const args =
      (route.method === "post" && route.path === "/login") ||
      (route.method === "post" && route.path === "/users")
        ? [route.path]
        : (route.method === "post" && route.path === "/markers") ||
          (route.method === "put" && route.path === "/markers/:id")
          ? [route.path, upload.any(), jwt({ secret: "secretkey-1992" })]
          : [route.path, jwt({ secret: "secretkey-1992" })];

    app[route.method](
      ...args,
      (request: Request, response: Response, next: Function) => {
        route
          .action(request, response)
          .then(() => next)
          .catch(err => next(err));
      }
    );
  });
});

export default app;
