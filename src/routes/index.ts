import {getHomePage} from '../controllers/homePage';
import {getMarkers} from '../controllers/getMarkers';
import {postMarker} from '../controllers/postMarker';
import {getMarker} from '../controllers/getMarker';
import {removeMarker} from '../controllers/removeMarker';
import {editMarker} from '../controllers/editMarker';

import {postSelectedMarker} from '../controllers/postSelectedMarker';
import {getSelectedMarkers} from '../controllers/getSelectedMarkers';
import {getSelectedMarker} from '../controllers/getSelectedMarker';
import {removeSelectedMarker} from '../controllers/removeSelectedMarker';

import {login} from '../controllers/login';
import {postUser} from '../controllers/postUser';
import {getUsers} from '../controllers/getUsers';


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
