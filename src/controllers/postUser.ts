import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from '../entity/User';

export async function postUser (request: Request, response: Response) {

  console.log(request.body);
  const userRepository = getManager().getRepository(User);

  const user = {
    login: request.body.login,
    password: request.body.password
  }

  const newUser = await userRepository.save(user);
  return response.json(user);


//  const newUser = await markerRepository.save(user);
  //return response.json(newMarker);

}
