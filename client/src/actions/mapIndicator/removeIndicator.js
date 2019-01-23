import axios from "axios";

const removeIndicatorSuccess = id => ({
  type: "REMOVED_INDICATOR_SUCCESS",
  id
});

const removedIndicatorError = error => ({
  type: "REMOVED_INDICATOR_ERROR",
  error
});

export const removeIndicator = id => dispatch => {
  console.log(id);
  dispatch({ type: "REMOVING_INDICATOR" });
  axios
    .create({ baseURL: "http://46.101.186.181:8080" })
    .delete(`/indicators/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(removeIndicatorSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(removedIndicatorError(error));
    });
};
