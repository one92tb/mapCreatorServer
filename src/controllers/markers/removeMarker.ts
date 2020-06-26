import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Marker } from "../../entity/Marker";
import { Indicator } from "../../entity/Indicator";

export const removeMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);
  const indicatorRepository = getManager().getRepository(Indicator);
  const markerToDelete = await markerRepository.findOne(request.params.id);
  const mapIndicatorsToDelete = await indicatorRepository.find({
    name: markerToDelete.name
  });

  if (
    markerToDelete.userId === request.user.userData.userId &&
    mapIndicatorsToDelete.every(
      indicator => indicator.userId === request.user.userData.userId
    )
  ) {
    markerRepository.remove(markerToDelete);
    indicatorRepository.remove(mapIndicatorsToDelete);
    return response.json(markerToDelete);
  } else {
    Promise.reject("Forbidden");
  }
};
