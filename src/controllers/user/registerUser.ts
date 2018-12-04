import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

export async function registerUser(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const firstUser = await userRepository.findOne(1);

  const user = {
    login: request.body.login,
    password: request.body.password,
    isAdmin: (firstUser) ? false : true
  };

  const findLogin = await userRepository.findOne({
    login: user.login
  });

  if (!findLogin) {
    const newUser = await userRepository.save(user);
    return response.json(user);
  } else {
    return response.status(409).json({
      errorMessage: "This login is exist"
    });
  }
}
