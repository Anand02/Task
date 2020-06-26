import { ADD_ARTICLE } from '../constants/action-types';

import { ADD_ARTICLE2 } from '../constants/action-types';

import axios from "axios";

export const getMovies2 = movies => ({
    type: "GET_MOVIES",
    movies
  });
  
export const getMoviesX = movies => ({
    type: "GET_MOVIES_X",
    movies
});
  
export const updateSearchKey = key => ({
    type: "UPDATE_SEARCH_KEY",
    key
});

export const filterMovies = key => ({
    type: "Filter_MOVIES",
    key
});
export function addArticle(payload){
    return { type: ADD_ARTICLE , payload}
}

export function addArticle2(payload){
    return { type: ADD_ARTICLE2 , payload}
}

export const asyncFilterMovies = key => {
    return dispatch => {
      new Promise((resolve, reject) => {
        resolve();
      }).then(() => {
        dispatch(filterMovies(key));
      });
    };
  };
  
export const getMovies = (page, flush) => {
    return dispatch => {
      axios
        .get(`CONTENTLISTINGPAGE-PAGE${page}.json`)
        .then(res => {
          if (!flush) {
            dispatch(getMovies2(res.data.page["content-items"].content));
          } else {
            dispatch(getMoviesX(res.data.page["content-items"].content));
          }
        })
    };
  };