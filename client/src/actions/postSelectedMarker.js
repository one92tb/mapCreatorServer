import axios from 'axios';

const postedSelectedRecord = (marker) => ({
  type: 'POSTED_SELECTED_MARKER_SUCCESS',
  marker
});

const postedSelectedError = (error) => ({
  type: 'POSTED_SELECTED_ERROR',
  error
})

export const postSelectedMarker = (marker) => (dispatch) => {
  dispatch({type: 'POSTING_SELECTED_MARKER'});
  axios.create({baseURL: 'http://localhost:8080'}).post('/selectedMarkers', marker)
    .then(res => {
      console.log(res.data);
      dispatch(postedSelectedRecord(res.data));
    })
    .catch(error=>{
      dispatch(postedSelectedError(error));
    })
};
