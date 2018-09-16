import axios from 'axios';

const fetchedMarkerRecord = (records) => ({
  type: 'FETCHED_RECORD_SUCCESS',
  records
})

const fetchedMarkerError = (error) => ({
  type: 'FETCHED_RECORD_ERROR',
  error
})

export const fetchMarkerRecord = () => (dispatch) => {
  dispatch({type: 'FETCHING_RECORD'});
  axios.create({baseURL: 'http://localhost:8080'}).get('/markers')
    .then(res=>{
      dispatch(fetchedMarkerRecord(res.data));
    })
    .catch(error=>{
      dispatch(fetchedMarkerError(error));
    })
}
