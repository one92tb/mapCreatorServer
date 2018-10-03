import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Marker} from '../entity/Marker';

export const getMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);
  const getMarker = await markerRepository.findOne(request.params.id);
  return response.json(getMarker);
}
