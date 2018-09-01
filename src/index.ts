import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import "reflect-metadata";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { ConnectionOptions } from 'typeorm';
import { getManager, getRepository } from "typeorm";

const express = require('express');
const app = express();

const path = require('path');
const routes = require('./routes/routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

app.use(cors());
app.use('/', routes);

app.set('port', 8080);

app.engine('pug', require('pug').__express);
app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


module.exports = app;
