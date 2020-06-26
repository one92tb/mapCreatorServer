import { Request, Response } from "express";
import { fetchMarkers } from "../controllers/markers/fetchMarkers";
import { getMarker } from "../controllers/markers/getMarker";
import { removeMarker } from "../controllers/markers/removeMarker";
import { editMarker } from "../controllers/markers/editMarker";
import { postMarker } from "../controllers/markers/postMarker";

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".png");
  }
});

const upload = multer({ storage: storage });

router.get("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  fetchMarkers(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.get("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  getMarker(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.delete("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  removeMarker(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.put("/:id", upload.any(), jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  editMarker(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.post("/", upload.any(), jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  postMarker(request, response)
    .then(() => next)
    .catch(err => next(err));
})

module.exports = router;
