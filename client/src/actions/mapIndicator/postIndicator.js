import axios from "axios";

const postedIndicatorSuccess = indicator => ({
  type: "POSTED_INDICATOR_SUCCESS",
  indicator
});

const postedIndicatorError = error => ({
  type: "POSTED_INDICATOR_ERROR",
  error
});

export const postIndicator = indicator => dispatch => {
  dispatch({ type: "POSTING_INDICATOR" });
  axios
    .create({ baseURL: "http://46.101.186.181:8080" })
    .post("/indicators", indicator, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(postedIndicatorSuccess(res.data));
    })
    .catch(error => {
      dispatch(postedIndicatorError(error));
    });
};
