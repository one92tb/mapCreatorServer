import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Indicator } from "../../entity/Indicator";

export async function removeIndicator(
  request: Request,
  response: Response
) {
  const indicatorRepository = getManager().getRepository(Indicator);
  const indicatorToDelete = await indicatorRepository.findOne(
    request.params.id
  );
  if (indicatorToDelete.userId === request.user.userData.userId) {
    indicatorRepository.remove(indicatorToDelete);
    return response.json(indicatorToDelete);
  } else {
    Promise.reject("Forbidden");
  }
}
