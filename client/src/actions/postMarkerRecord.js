import axios from 'axios';

const postedMarkerRecord = (record) => ({
  type: 'POSTED_RECORD_SUCCESS',
  record
});

const postedMarkerError = (error) => ({
  type: 'POSTED_RECORD_ERROR',
  error
});

export const postMarkerRecord = (record) => (dispatch) => {
    console.log(record);
    dispatch({type: 'POSTING_RECORD'});
    axios.create({baseURL: 'http://localhost:8080'}).post('/markers', record)
      .then(res=> {
        console.log(res);
        dispatch(postedMarkerRecord(res.data));
      })
      .catch(error=>{
        dispatch(postedMarkerError(error));
      })
}
