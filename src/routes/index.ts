import {getHomePage} from '../controllers/homePage';
import {getMarkers} from '../controllers/getMarkers';
import {postMarker} from '../controllers/postMarker';
import {postSelectedMarker} from '../controllers/postSelectedMarker';

export const routes = [
  {
    path: '/',
    method: 'get',
    action: getHomePage
  },
  {
    path: '/markers',
    method: 'get',
    action: getMarkers
  },
  {
    path: '/markers',
    method: 'post',
    action: postMarker
  },
  {
    path: '/selectedMarkers',
    method: 'post',
    action: postSelectedMarker
  }
]
