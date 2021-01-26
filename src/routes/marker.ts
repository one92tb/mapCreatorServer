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

router.get("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  fetchMarkers(request, response);
});

router.get("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  getMarker(request, response);
});

router.delete("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  removeMarker(request, response);
});

router.put("/:id", upload.any(), jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  editMarker(request, response);
});

router.post("/", upload.any(), jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  postMarker(request, response);
});

export default router;
