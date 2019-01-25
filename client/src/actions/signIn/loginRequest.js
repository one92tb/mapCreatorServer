import axios from "axios";
import history from "../../history";
import baseUrl from "../../baseUrl";

const loginSuccess = userData => ({
  type: "LOGIN_SUCCESS",
  userData
});

const loginError = error => ({
  type: "LOGIN_ERROR",
  error
});

export const loginRequest = userData => dispatch => {
  dispatch({ type: "LOGIN_REQUEST" });
  axios
    .create({ baseURL: `${baseUrl}` })
    .post("/login", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data));
      history.push("./");
    })
    .catch(error => {
      console.log(error, error.response);
      dispatch(loginError(error));
    });
};
