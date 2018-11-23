import axios from "axios";

const removedRecord = id => ({
  type: "REMOVED_RECORD",
  id
});

const removedRecordError = error => ({
  type: "REMOVED_RECORD_ERROR",
  error
});

export const removeRecord = id => dispatch => {
  console.log(id);
  dispatch({ type: "REMOVING_RECORD" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .delete(`/markers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      console.log(res);
      dispatch(removedRecord(res.data.id));
    })
    .catch(error => {
      dispatch(removedRecordError(error));
    });
};
