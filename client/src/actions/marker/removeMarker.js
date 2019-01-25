import axios from "axios";
import baseUrl from "../../baseUrl";

const removeMarkerSuccess = id => ({
  type: "REMOVED_MARKER_SUCCESS",
  id
});

const removeMarkerError = error => ({
  type: "REMOVED_MARKER_ERROR",
  error
});

export const removeMarker = id => dispatch => {
  console.log(id);
  dispatch({ type: "REMOVING_MARKER" });
  axios
    .create({ baseURL: `${baseUrl}` })
    .delete(`/markers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log(res);
      dispatch(removeMarkerSuccess(res.data.id));
    })
    .catch(error => {
      dispatch(removeMarkerError(error));
    });
};
