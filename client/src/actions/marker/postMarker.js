import axios from "axios";
import baseUrl from "../../baseUrl";

export const postedMarkerSuccess = marker => ({
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
    .create({ baseURL: `${baseUrl}` })
    .post("/markers", marker, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log(res.data);
      dispatch(postedMarkerSuccess(res.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(postedMarkerError(error));
    });
};
