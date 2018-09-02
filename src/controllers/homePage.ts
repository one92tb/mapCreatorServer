import {Request, Response} from "express";

export async function getHomePage (request: Request, response: Response) {
  response.render('home');
}
