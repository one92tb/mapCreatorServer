import axios from "axios";

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
    .create({ baseURL: "http://localhost:8080" })
    .post("/login", userData)
    .then(res => {
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("token", res.data.token);
    })
    .catch(error => {
      dispatch(loginError(error));
    });
};
