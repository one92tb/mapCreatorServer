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
const cors = require('cors');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const routes = require('./routes/index');


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

app.use('/', routes);







module.exports = app;
