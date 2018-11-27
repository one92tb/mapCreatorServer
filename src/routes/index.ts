import {getHomePage} from '../controllers/homePage';

import {getMarkers} from '../controllers/markers/getMarkers';
import {postMarker} from '../controllers/markers/postMarker';
import {getMarker} from '../controllers/markers/getMarker';
import {removeMarker} from '../controllers/markers/removeMarker';
import {editMarker} from '../controllers/markers/editMarker';

import {postSelectedMarker} from '../controllers/selectedMarkers/postSelectedMarker';
import {getSelectedMarkers} from '../controllers/selectedMarkers/getSelectedMarkers';
import {getSelectedMarker} from '../controllers/selectedMarkers/getSelectedMarker';
import {removeSelectedMarker} from '../controllers/selectedMarkers/removeSelectedMarker';

import {login} from '../controllers/user/login';
import {postUser} from '../controllers/user/postUser';
import {getUsers} from '../controllers/user/getUsers';


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
  },
  {
    path: '/markers/:id',
    method: 'put',
    action: editMarker
  },
  {
    path: '/login',
    method: 'post',
    action: login
  },
  {
    path: '/users',
    method: 'post',
    action: postUser
  },
  {
    path: '/users',
    method: 'get',
    action: getUsers
  }
]
