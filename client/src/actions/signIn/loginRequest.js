import axios from "axios";
import history from "../../history";

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
    .create({ baseURL: "http://46.101.186.181:8080" })
    .post("/login", userData)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data));
      history.push("./");
    })
    .catch(error => {
      dispatch(loginError(error));
    });
};
