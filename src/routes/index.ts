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
import { registerUser } from "../controllers/user/registerUser";
import { fetchUsers } from "../controllers/user/fetchUsers";
import { getUser } from "../controllers/user/getUser";
import { changePermissions } from "../controllers/user/changePermissions";
import { deleteAccount } from "../controllers/user/deleteAccount";

export const routes = [
  {
    path: "/api/",
    method: "get",
    action: getHomePage
  },
  {
    path: "/api/markers",
    method: "get",
    action: fetchMarkers
  },
  {
    path: "/api/markers",
    method: "post",
    action: postMarker
  },
  {
    path: "/api/markers/:id",
    method: "delete",
    action: removeMarker
  },
  {
    path: "/api/markers/:id",
    method: "put",
    action: editMarker
  },
  {
    path: "/api/indicators",
    method: "post",
    action: postIndicator
  },
  {
    path: "/api/indicators",
    method: "get",
    action: fetchIndicators
  },
  {
    path: "/api/indicators/:id",
    method: "get",
    action: getIndicator
  },
  {
    path: "/api/indicators/:id",
    method: "delete",
    action: removeIndicator
  },
  {
    path: "/api/markers/:id",
    method: "get",
    action: getMarker
  },
  {
    path: "/api/login",
    method: "post",
    action: login
  },
  {
    path: "/api/users",
    method: "post",
    action: registerUser
  },
  {
    path: "/api/users",
    method: "get",
    action: fetchUsers
  },
  {
    path: "/api/users/:id",
    method: "get",
    action: getUser
  },
  {
    path: "/api/users/:id",
    method: "patch",
    action: changePermissions
  },
  {
    path: "/api/users/:id",
    method: "delete",
    action: deleteAccount
  }
];
