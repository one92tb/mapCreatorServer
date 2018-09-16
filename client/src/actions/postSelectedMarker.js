import axios from 'axios';

const postedSelectedRecord = (record) => ({
  type: 'POSTED_SELECTED_MARKER_SUCCESS',
  record
});

const postedSelectedError = (error) => ({
  type: 'POSTED_SELECTED_ERROR',
  error
})

export const postSelectedMarker = (record) => (dispatch) => {
  console.log(record);
  dispatch({type: 'POSTING_SELECTED_MARKER'});
  axios.create({baseURL: 'http://localhost:8080'}).post('/selectedMarkers', record)
    .then(res => {
      console.log(res.data);
      dispatch(postedSelectedRecord(res.data));
    })
    .catch(error=>{
      dispatch(postedSelectedError(error));
    })
};
