import axios from "axios";
import baseUrl from "../../baseUrl";

export const postedMarkerSuccess = marker => ({
  type: "POSTED_MARKER_SUCCESS",
  marker
});

export const postedMarkerError = error => ({
  type: "POSTED_MARKER_ERROR",
  error
});

export const postMarker = marker => dispatch => {
  dispatch({ type: "POSTING_MARKER" });
  return axios
    .create({ baseURL: `${baseUrl}` })
    .post("/markers", marker, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      //console.log(res);
      dispatch(postedMarkerSuccess(res.data));
    })
    .catch(error => {
      //console.log(error);
      dispatch(postedMarkerError(error));
    });
};

export const POSTING_MARKER = 'POSTING_MARKER';
export const POSTED_MARKER_SUCCESS = 'POSTED_MARKER_SUCCESS';
export const POSTED_MARKER_ERROR = 'POSTED_MARKER_ERROR';
