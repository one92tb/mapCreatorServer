import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Marker} from '../entity/Marker';

export async function getMarkers (request, response) {
    console.log('well done');
};
