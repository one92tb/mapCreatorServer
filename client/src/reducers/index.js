import {combineReducers} from 'redux';
import marker from './marker';
import selectedMarker from './selectedMarker';
import user from './user';
import account from './account';

export default combineReducers ({
  marker,
  selectedMarker,
  user,
  account
})
