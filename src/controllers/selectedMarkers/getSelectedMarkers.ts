import { Request, Response } from "express";
import { getManager } from "typeorm";
import { SelectedMarker } from "../../entity/SelectedMarker";

export async function getSelectedMarkers(request: Request, response: Response) {
  const selectedMarkerRepository = getManager().getRepository(SelectedMarker);
  const selectedMarkers = await selectedMarkerRepository.find({
    userId: request.user.userData.userId
  });
  return response.json(selectedMarkers);
}
