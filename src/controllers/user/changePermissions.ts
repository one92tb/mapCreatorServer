import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";

export const changePermissions = async (
  request: Request,
  response: Response
) => {
  const userRepository = getManager().getRepository(User);
  const user = {
    id: parseInt(request.params.id),
    isAdmin: request.body.isAdmin
  };

  const editedUser = await userRepository.preload(user).then(updatedUser => {
    userRepository.save(updatedUser);
    const from = updatedUser.isAdmin ? "User" : "Admin";
    const to = updatedUser.isAdmin ? "Admin" : "User";
    return response.json(
      `User ${updatedUser.id} - Status has been changed from ${from} to ${to}`
    );
  });
};
