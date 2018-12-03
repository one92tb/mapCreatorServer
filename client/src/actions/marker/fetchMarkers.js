import axios from "axios";

const fetchedMarkersSuccess = markers => ({
  type: "FETCHED_MARKERS_SUCCESS",
  markers
});

const fetchedMarkersError = error => ({
  type: "FETCHED_MARKERS_ERROR",
  error
});

export const fetchMarkers = () => dispatch => {
  dispatch({ type: "FETCHING_MARKERS" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .get("/markers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(fetchedMarkersSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchedMarkersError(error));
    });
};
