import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function registerUser(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const firstUser = await userRepository.findOne(1);

   bcrypt.genSalt(saltRounds, (err, salt) => {
     bcrypt.hash(request.body.password, salt, async (err, hash) => {
      const user = {
        login: request.body.login,
        password: hash,
        isAdmin: firstUser ? false : true
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
    });
  });
}
