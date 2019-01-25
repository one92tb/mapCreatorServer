import axios from "axios";
import baseUrl from "../../baseUrl";

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
    .create({ baseURL: `${baseUrl}` })
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
