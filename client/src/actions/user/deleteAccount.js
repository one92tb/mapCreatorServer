import axios from "axios";

const deletedAccountSuccess = id => ({
  type: "DELETED_ACCOUNT_SUCCESS",
  id
});

const deletedAccountError = error => ({
  type: "DELETED_ACCOUNT_ERRIR",
  error
});

export const deleteAccount = id => dispatch => {
  console.log(id);
  dispatch({ type: "DELETING_ACCOUNT" });
  axios
    .create({ baseURL: "http://46.101.186.181:8080" })
    .delete(`/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log(res);
      dispatch(deletedAccountSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(deletedAccountError(error));
    });
};
