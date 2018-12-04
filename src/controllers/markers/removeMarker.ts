import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Marker } from "../../entity/Marker";

export const removeMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);
  const markerToDelete = await markerRepository.findOne(request.params.id);
  if (markerToDelete.userId === request.user.userData.userId) {
    markerRepository.remove(markerToDelete);
    return response.json(markerToDelete);
  } else {
    Promise.reject("Forbidden");
  }
};
