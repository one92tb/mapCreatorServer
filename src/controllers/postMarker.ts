import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Marker} from '../entity/Marker';

export async function postMarker (request: Request, response: Response) {

  const markerRepository = getManager().getRepository(Marker);

  const marker = {
    name: request.body.markerName,
    icon: request.files[0].filename
  }
  console.log(marker);

  const newMarker = await markerRepository.save(marker);
  return response.json(newMarker);

}
