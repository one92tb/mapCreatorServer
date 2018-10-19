import axios from "axios";

const fetchedSelectedMarkers = markers => ({
  type: "FETCHED_MARKERS_SUCCESS",
  markers
});

const fetchedSelectedError = error => ({
  type: "FETCHED_MARKERS_ERROR",
  error
});

export const fetchSelectedMarkers = () => dispatch => {
  dispatch({ type: "FETCHING_MARKERS" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .get("/selectedMarkers")
    .then(res => {
      console.log(res);
      dispatch(fetchedSelectedMarkers(res.data));
    })
    .catch(error => {
      dispatch(fetchedSelectedError(error));
    });
};
