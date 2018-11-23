import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Marker } from "../../entity/Marker";

export const getMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);
  const getMarker = await markerRepository.findOne(request.params.id);

  if (getMarker.userId !== request.user.userData.userId) {
    return response.json(getMarker);
  } else {
    Promise.reject("Forbidden");
  }
};
