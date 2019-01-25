import axios from "axios";
import baseUrl from "../../baseUrl";

const createUserSuccess = user => ({
  type: "POSTED_USER_SUCCESS",
  user
});

const createdUserError = error => ({
  type: "POSTED_USER_ERROR",
  error
});

export const createUser = user => dispatch => {
  dispatch({ type: "POSTING_USER" });
  axios
    .create({ baseURL: `${baseUrl}` })
    .post("/users", user)
    .then(res => {
      console.log(res.data);
      dispatch(createUserSuccess(res.data));
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(createdUserError(error));
    });
};
