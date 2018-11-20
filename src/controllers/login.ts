import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/User";
const jwt = require("jsonwebtoken");

export async function login(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);

  const userData = {
    login: request.body.login,
    password: request.body.password
  };

  const checkLoginData = await userRepository.findOne({
    login: userData.login,
    password: userData.password
  });

  if (checkLoginData) {
    jwt.sign(
      { userData },
      "secretkey-1992",
      { expiresIn: "600s" },
      (err, token) => {
        response.json({
          userName: checkLoginData.login,
          userId: checkLoginData.id,
          token: token,
          isAuthorized: true,
          error: ''
        });
      }
    );
  }else{
    return response.json({
      userName: '',
      userId: '',
      token: '',
      isAuthorized: false,
      error: "This account is not exist"
    })
  }
}
