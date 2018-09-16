import {Request, Response} from "express";
import {getManager} from "typeorm";
import {SelectedMarker} from '../entity/SelectedMarker';

export async function getSelectedMarkers (request: Request, response: Response) {
  console.log('x', request.body);
    const selectedMarkerRepository = getManager().getRepository(SelectedMarker);
    const selectedMarkers = await selectedMarkerRepository.find();
    return response.json(selectedMarkers);
}
