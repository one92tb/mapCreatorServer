import axios from "axios";

const fetchedUsersSuccess = users => ({
  type: "FETCHED_USERS_SUCCESS",
  users
});

const fetchedUsersError = error => ({
  type: "FETCHED_USERS_ERROR",
  error
});

export const fetchUsers = () => dispatch => {
  dispatch({ type: "FETCHING_USERS" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .get("/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(fetchedUsersSuccess(res.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchedUsersError(error));
    });
};
