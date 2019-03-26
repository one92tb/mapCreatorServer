import axios from "axios";
import baseUrl from "../../baseUrl";
import { redirectToMain } from "../redirect/redirect";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

const loginSuccess = userData => ({
  type: LOGIN_SUCCESS,
  userData
});

const loginError = error => ({
  type: LOGIN_ERROR,
  error
});

export const loginRequest = userData => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .create({ baseURL: `${baseUrl}` })
    .post("/login", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data));
      dispatch(redirectToMain());
    })
    .catch(error => {
      dispatch(loginError(error));
    });
};
