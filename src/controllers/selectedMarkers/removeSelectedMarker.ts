import { Request, Response } from "express";
import { getManager } from "typeorm";
import { SelectedMarker } from "../../entity/SelectedMarker";

export async function removeSelectedMarker(
  request: Request,
  response: Response
) {
  const markerRepository = getManager().getRepository(SelectedMarker);
  const markerToDelete = await markerRepository.findOne(request.params.id);
  if (markerToDelete.userId !== request.user.userData.userId) {
    markerRepository.remove(markerToDelete);
    return response.json(markerToDelete);
  } else {
    Promise.reject("Forbidden");
  }
}
