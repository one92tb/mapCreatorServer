import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

export async function getUser(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const getUser = await userRepository.findOne(request.params.id);
  return response.json(getUser);
}
