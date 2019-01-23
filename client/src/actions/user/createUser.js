import axios from "axios";

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
    .create({ baseURL: "http://46.101.186.181:8080" })
    .post("/users", user)
    .then(res => {
      dispatch(createUserSuccess(res.data));
    })
    .catch(error => {
      dispatch(createdUserError(error));
    });
};
