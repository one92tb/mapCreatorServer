import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

export async function deleteAccount(request: Request, response: Response) {
  const userRepository = getManager().getRepository(User);
  const userToDelete = await userRepository.findOne(request.params.id);
  userRepository.remove(userToDelete);
  return response.json(userToDelete);
}
