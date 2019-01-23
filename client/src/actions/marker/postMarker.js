import axios from "axios";

const postedMarkerSuccess = marker => ({
  type: "POSTED_MARKER_SUCCESS",
  marker
});

const postedMarkerError = error => ({
  type: "POSTED_MARKER_ERROR",
  error
});

export const postMarker = marker => dispatch => {
  dispatch({ type: "POSTING_MARKER" });
  axios
    .create({ baseURL: "http://46.101.186.181:8080" })
    .post("/markers", marker, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(postedMarkerSuccess(res.data));
    })
    .catch(error => {
      dispatch(postedMarkerError(error));
    });
};
