import "reflect-metadata";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { ConnectionOptions } from 'typeorm';
import { getManager, getRepository } from "typeorm";

const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

import { routes } from './routes/index';

app.engine('pug', require('pug').__express);
app.set('port', 8080);
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(flash());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.png');
  },
});

const upload = multer({ storage: storage });

const options: ConnectionOptions = {
  'type': 'sqlite',
  "logging": true,
  'database': 'db/mydb.db',
  'synchronize': true,
  'entities': ["src/entity/*.ts"]
};

createConnection(options).then(async connection => {
  routes.forEach(route => {
    if (route.method === 'post' && route.path === '/markers') {
      app[route.method](route.path, upload.any(), (request: Request, response: Response, next: Function) => {
        route.action(request, response)
          .then(() => next)
          .catch(err => next(err));
      });
    } else {
      app[route.method](route.path, (request: Request, response: Response, next: Function) => {
        route.action(request, response)
          .then(() => next)
          .catch(err => next(err));
      });
    }
  });
})

module.exports = app;
