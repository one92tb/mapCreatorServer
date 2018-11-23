import axios from "axios";

const fetchedRecords = records => ({
  type: "FETCHED_RECORDS_SUCCESS",
  records
});

const fetchedRecordsError = error => ({
  type: "FETCHED_RECORDS_ERROR",
  error
});

export const fetchRecords = () => dispatch => {
  dispatch({ type: "FETCHING_RECORDS" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .get("/markers", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      dispatch(fetchedRecords(res.data));
    })
    .catch(error => {
      dispatch(fetchedRecordsError(error));
    });
};
