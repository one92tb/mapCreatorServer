import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Indicator } from "../../entity/Indicator";

export const fetchIndicators = async (request: Request, response: Response) => {
  const indicatorRepository = getManager().getRepository(Indicator);
  const indicators = await indicatorRepository.find({
    userId: request.user.userData.userId
  });
  return response.json(indicators);
};
