import axios from "axios";

const removedSelectedRecord = id => ({
  type: "REMOVED_SELECTED_MARKER_SUCCESS",
  id
});

const removedSelectedError = error => ({
  type: "REMOVED_SELECTED_MARKER_ERROR",
  error
});

export const removeSelectedMarker = id => dispatch => {
  console.log(id);
  dispatch({ type: "REMOVING_SELECTED_MARKER" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .delete(`/selectedMarkers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(removedSelectedRecord(res.data.id));
    })
    .catch(error => {
      dispatch(removedSelectedError(error));
    });
};
