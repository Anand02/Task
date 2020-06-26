import { createStore } from 'redux';
import rootReducer from '../reducers/index';


//1st step create store 
const store  = createStore(rootReducer);

export default store;