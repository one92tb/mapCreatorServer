import {getHomePage} from '../controllers/homePage';
import {getMarkers} from '../controllers/getMarkers';
import {postMarker} from '../controllers/postMarker';
import {postSelectedMarker} from '../controllers/postSelectedMarker';
import {getSelectedMarkers} from '../controllers/getSelectedMarkers';
import {getSelectedMarker} from '../controllers/getSelectedMarker';
import {removeSelectedMarker} from '../controllers/removeSelectedMarker';
import {getMarker} from '../controllers/getMarker';
import {removeMarker} from '../controllers/removeMarker';


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
  },
  {
    path: '/selectedMarkers',
    method: 'get',
    action: getSelectedMarkers
  },
  {
    path: '/selectedMarkers/:id',
    method: 'get',
    action: getSelectedMarker
  },
  {
    path: '/selectedMarkers/:id',
    method: 'delete',
    action: removeSelectedMarker
  },
  {
    path: '/markers/:id',
    method: 'get',
    action: getMarker
  },
  {
    path: '/markers/:id',
    method: 'delete',
    action: removeMarker
  }
]
