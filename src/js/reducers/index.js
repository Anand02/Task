
import { ADD_ARTICLE } from '../constants/action-types';

import { ADD_ARTICLE2 } from '../constants/action-types';

import { combineReducers } from "redux";

// const initialState = {
//     articles:[]
// }

const initalState = [];


const moviesReducer = (state = initalState, action) => {
    switch (action.type) {
      case "GET_MOVIES":
        return [...state, ...action.movies];
      case "GET_MOVIES_X":
        return [...action.movies];
      case "Filter_MOVIES":
        if (action.key.trim().length < 1) {
          return [...state];
        }
        const regex = RegExp(`${action.key.toLowerCase()}`);
        let newState = state.filter(
          movie => regex.test(movie.name.toLowerCase())
        );
        return [...newState];
      default:
        return state;
    }
  };
  
// step 2 reducer funtion with state and action

// function rootReducer(state = initialState, action){
//     if(action.type === ADD_ARTICLE){
//         return Object.assign({}, state, {
//             articles : state.articles.concat(action.payload)
//         });
//     }

//     if(action.type === ADD_ARTICLE2){
//         return Object.assign({}, state, {
//             articles : state.articles.concat(action.payload)
//         });
//     }
//     return state;
// }
const searchReducer = (state = { searchKey: "" }, action) => {
    switch (action.type) {
      case "UPDATE_SEARCH_KEY":
        return { ...state, ...{ searchKey: action.key } };
      default:
        return state;
    }
  };

  const rootReducer = combineReducers({
    movies: moviesReducer,
    search: searchReducer
  });

export default rootReducer;

