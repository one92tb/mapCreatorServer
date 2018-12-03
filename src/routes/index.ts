import { getHomePage } from "../controllers/homePage";

import { fetchMarkers } from "../controllers/markers/fetchMarkers";
import { postMarker } from "../controllers/markers/postMarker";
import { getMarker } from "../controllers/markers/getMarker";
import { removeMarker } from "../controllers/markers/removeMarker";
import { editMarker } from "../controllers/markers/editMarker";

import { postIndicator } from "../controllers/indicators/postIndicator";
import { fetchIndicators } from "../controllers/indicators/fetchIndicators";
import { getIndicator } from "../controllers/indicators/getIndicator";
import { removeIndicator } from "../controllers/indicators/removeIndicator";

import { login } from "../controllers/user/login";
import { postUser } from "../controllers/user/postUser";
import { getUsers } from "../controllers/user/getUsers";

export const routes = [
  {
    path: "/",
    method: "get",
    action: getHomePage
  },
  {
    path: "/markers",
    method: "get",
    action: fetchMarkers
  },
  {
    path: "/markers",
    method: "post",
    action: postMarker
  },
  {
    path: "/markers/:id",
    method: "delete",
    action: removeMarker
  },
  {
    path: "/markers/:id",
    method: "put",
    action: editMarker
  },
  {
    path: "/indicators",
    method: "post",
    action: postIndicator
  },
  {
    path: "/indicators",
    method: "get",
    action: fetchIndicators
  },
  {
    path: "/indicators/:id",
    method: "get",
    action: getIndicator
  },
  {
    path: "/indicators/:id",
    method: "delete",
    action: removeIndicator
  },
  {
    path: "/markers/:id",
    method: "get",
    action: getMarker
  },
  {
    path: "/login",
    method: "post",
    action: login
  },
  {
    path: "/users",
    method: "post",
    action: postUser
  },
  {
    path: "/users",
    method: "get",
    action: getUsers
  }
];
