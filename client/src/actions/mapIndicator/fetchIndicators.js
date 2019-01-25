import axios from "axios";
import baseUrl from "../../baseUrl";

const fetchedIndicators = indicators => ({
  type: "FETCHED_INDICATORS_SUCCESS",
  indicators
});

const fetchedIndicatorsError = error => ({
  type: "FETCHED_INDICATORS_ERROR",
  error
});

export const fetchIndicators = () => dispatch => {
  dispatch({ type: "FETCHING_INDICATORS" });
  axios
    .create({ baseURL: `${baseUrl}` })
    .get("/indicators", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(fetchedIndicators(res.data));
    })
    .catch(error => {
      dispatch(fetchedIndicatorsError(error));
    });
};
