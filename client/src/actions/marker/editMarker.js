import axios from "axios";

const editedMarkerSuccess = marker => ({
  type: "EDITED_MARKER_SUCCESS",
  marker
});

const editedRecordError = error => ({
  type: "EDITED_MARKER_ERROR",
  error
});

export const editMarker = (marker, id) => dispatch => {
  console.log(marker, id);
  dispatch({ type: "EDITING_MARKER" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .put(`/markers/${id}`, marker, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(editedMarkerSuccess(res.data));
    })
    .catch(error => {
      dispatch(editedRecordError(error));
    });
};
