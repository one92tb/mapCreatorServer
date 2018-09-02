import reducers from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

const middleware =[thunk];

export const store = createStore(reducers, {}, applyMiddleware(...middleware));
