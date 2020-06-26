import { Request, Response } from "express";
import { login } from "../controllers/user/login";
import { registerUser } from "../controllers/user/registerUser";
import { fetchUsers } from "../controllers/user/fetchUsers";
import { getUser } from "../controllers/user/getUser";
import { changePermissions } from "../controllers/user/changePermissions";
import { deleteAccount } from "../controllers/user/deleteAccount";

const express = require("express");
const router = express.Router();
const jwt = require("express-jwt");

require('dotenv').config();

router.post("/", (request: Request, response: Response, next: Function) => {
  registerUser(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.get("/", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  fetchUsers(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.get("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  getUser(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.patch("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  changePermissions(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.delete("/:id", jwt({ secret: process.env.SECRET_KEY }), (request: Request, response: Response, next: Function) => {
  deleteAccount(request, response)
    .then(() => next)
    .catch(err => next(err));
})

router.post("/login", (request: Request, response: Response, next: Function) => {
  login(request, response)
    .then(() => next)
    .catch(err => next(err));
})

module.exports = router;
