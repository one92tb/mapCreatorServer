import axios from "axios";
import baseUrl from "../../baseUrl";

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
    .create({ baseURL: `${baseUrl}` })
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
