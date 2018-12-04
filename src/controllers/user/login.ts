import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";
const jwt = require("jsonwebtoken");

export async function login(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const checkLoginData = await userRepository.findOne({
    login: request.body.login,
    password: request.body.password
  });
  if (checkLoginData) {
    const userData = {
      login: request.body.login,
      userId: checkLoginData.id,
      isAdmin: checkLoginData.isAdmin
    };

    jwt.sign(
      { userData },
      "secretkey-1992",
      { expiresIn: "86400s" },
      (err, token) => {
        response.json({
          userName: checkLoginData.login,
          userId: checkLoginData.id,
          token: token,
          isAuthorized: true,
          error: ""
        });
      }
    );
  } else {
    return response.status(401).json({
      errorMessage: "login or password is incorrect"
    });
  }
}
