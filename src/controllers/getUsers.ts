import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from '../entity/User';

export async function getUsers (request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    return response.json(users);
};
