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

router.get("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  fetchIndicators(request, response);
})

router.get("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  getIndicator(request, response);
})

router.post("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  postIndicator(request, response);
})

router.delete("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  removeIndicator(request, response);
})

router.patch("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response) => {
  editIndicator(request, response);
})

export default router;
