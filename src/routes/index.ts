import {getHomePage} from '../controllers/homePage';
import {getMarkers} from '../controllers/getMarkers';
import {postMarker} from '../controllers/postMarker';

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
  }
]
