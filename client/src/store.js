import reducers from './reducers/index';
import thunk from 'redux-thunk';

const middleware =[thunk];

export const stroe = createStore(reducers, {});
