import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Marker} from '../entity/Marker';

export async function getMarkers (request: Request, response: Response) {
    const markerRepository = getManager().getRepository(Marker);
    const markers = await markerRepository.find();
    return response.json(markers);
};
