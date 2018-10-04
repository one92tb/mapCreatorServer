import axios from "axios";

const editedRecord = record => ({
  type: "EDITED_RECORD_SUCCESS",
  record
});

const editedRecordError = error => ({
  type: "EDITED_RECORD_ERROR",
  error
});

export const editRecord = (record, id) => dispatch => {
  console.log(record, id);
  dispatch({ type: "EDITING_RECORD" });
  axios
    .create({ baseURL: "http://localhost:8080" })
    .put(`/markers/${id}`, record)
    .then(res => {
      dispatch(editedRecord(res.data));
    })
    .catch(error => {
      dispatch(editedRecordError(error));
    });
};
