import { Request, Response } from "express";
import { getManager } from "typeorm";
import { SelectedMarker } from "../../entity/SelectedMarker";

export async function postSelectedMarker(request: Request, response: Response) {
  const selectedMarkerRepository = getManager().getRepository(SelectedMarker);

  const marker = {
    name: request.body.name,
    icon: request.body.icon,
    lat: request.body.lat,
    lng: request.body.lng,
    street: request.body.street,
    city: request.body.city,
    country: request.body.country,
    userId: request.user.userData.userId
  };

  const newSelectedMarker = await selectedMarkerRepository.save(marker);
  return response.json(marker);
}
