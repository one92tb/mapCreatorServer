import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Marker } from "../../entity/Marker";

export const editMarker = async (request: Request, response: Response) => {
  const markerRepository = getManager().getRepository(Marker);

  console.log(request.body, request.user.userData.userId);
  const marker = request.files
    ? {
        name: request.body.markerName,
        icon: request.files[0].filename,
        id: parseInt(request.params.id)
      }
    : {
        name: request.body.name,
        icon: request.body.icon,
        id: parseInt(request.params.id)
      };

  const editedMarker = await markerRepository
    .preload(marker)
    .then(updatedMarker => {
      if (updatedMarker.userId === request.user.userData.userId) {
        markerRepository.save(updatedMarker);
        return response.json(updatedMarker);
      } else {
        Promise.reject("Forbidden");
      }
    })
    .catch(error =>
      response.status(403).json({
        errorMessage: "blablabla"
      })
    );
};
