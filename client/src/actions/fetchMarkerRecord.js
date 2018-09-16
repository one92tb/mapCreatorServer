import axios from 'axios';

const fetchedMarkerRecord = (records) => ({
  type: 'FETCHED_RECORDS_SUCCESS',
  records
})

const fetchedMarkerError = (error) => ({
  type: 'FETCHED_RECORDS_ERROR',
  error
})

export const fetchMarkerRecord = () => (dispatch) => {
  dispatch({type: 'FETCHING_RECORDS'});
  axios.create({baseURL: 'http://localhost:8080'}).get('/markers')
    .then(res=>{
      dispatch(fetchedMarkerRecord(res.data));
    })
    .catch(error=>{
      dispatch(fetchedMarkerError(error));
    })
}
