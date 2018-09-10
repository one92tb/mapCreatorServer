import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Marker} from '../entity/Marker';

export async function getMarkers (request, response) {
    const markerRepository = getManager().getRepository(Marker);
    const markers = await markerRepository.find();

    return response.json(markers);

};
