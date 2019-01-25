import axios from "axios";
import baseUrl from "../../baseUrl";

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
    .create({ baseURL: `${baseUrl}` })
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
