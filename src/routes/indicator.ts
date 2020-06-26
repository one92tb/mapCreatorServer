import { Request, Response } from "express";
import { fetchIndicators } from "../controllers/indicators/fetchIndicators";
import { getIndicator } from "../controllers/indicators/getIndicator";
import { postIndicator } from "../controllers/indicators/postIndicator";
import { removeIndicator } from "../controllers/indicators/removeIndicator";
import { editIndicator } from "../controllers/indicators/editIndicator";

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");

require('dotenv').config();

router.get("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  fetchIndicators(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.get("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  getIndicator(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.post("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  postIndicator(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.delete("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  removeIndicator(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.patch("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  editIndicator(request, response)
    .then(() => next)
    .catch(err => next(err));
})

module.exports = router;
