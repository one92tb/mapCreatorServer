import {combineReducers} from 'redux';
import marker from './marker';
import selectedMarker from './selectedMarker';

export default combineReducers ({
  marker,
  selectedMarker
})
