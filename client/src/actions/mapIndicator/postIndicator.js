import axios from "axios";
import baseUrl from "../../baseUrl";

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
    .create({ baseURL: `${baseUrl}` })
    .post("/indicators", indicator, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log(res);
      dispatch(postedIndicatorSuccess(res.data));
    })
    .catch(error => {
      dispatch(postedIndicatorError(error));
    });
};
