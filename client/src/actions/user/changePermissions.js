import axios from "axios";

const changePermissionsSuccess = status => ({
  type: "CHANGED_PERMISSIONS_SUCCESS",
  status
});

const changePermissionsError = error => ({
  type: "CHANGED_PERMISSIONS_ERROR",
  error
});

export const changePermissions = (status, id) => dispatch => {
  console.log(status, id);
  dispatch({ type: "CHANGING_PERMISSIONS" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .patch(
      `/users/${id}`,
      {
        isAdmin: status
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    )
    .then(res => {
      console.log(res.data);
      dispatch(changePermissionsSuccess(res.data));
    })
    .catch(error => {
      dispatch(changePermissionsError(error));
    });
};
