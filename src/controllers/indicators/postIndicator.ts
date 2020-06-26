import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Indicator } from "../../entity/Indicator";

export async function postIndicator(request: Request, response: Response) {
  console.log(request.body);
  const indicatorRepository = getManager().getRepository(Indicator);
  const indicator = {
    name: request.body.name,
    icon: request.body.icon,
    lat: request.body.lat,
    lng: request.body.lng,
    street: request.body.street,
    city: request.body.city,
    country: request.body.country,
    isDefault: request.body.isDefault,
    userId: request.user.userData.userId
  };

  const newIndicator = await indicatorRepository.save(indicator);
  return response.json(indicator);
}
