import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Indicator } from "../../entity/Indicator";


export async function editIndicator(request: Request, response: Response) {

  const indicatorRepository = getManager().getRepository(Indicator);
  const indicatorToEdit = await indicatorRepository.findOne(
    request.params.id
  );

  const newIndicator = { ...indicatorToEdit, ...request.body };

  const editedIndicator = await indicatorRepository
    .preload(newIndicator)
    .then(updatedIndicator => {
      if (updatedIndicator.userId === request.user.userData.userId) {
        indicatorRepository.save(updatedIndicator);
        return response.json(updatedIndicator);
      } else {
        Promise.reject("Forbidden");
      }
    })
    .catch(error =>
      response.status(403).json({
        errorMessage: "error"
      })
    );
}
