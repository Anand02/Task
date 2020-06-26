import store from '../js/store/index';
import { addArticle } from '../js/actions/index';
import { addArticle2 } from '../js/actions/index';

// window.store = store;
// window.addArticle = addArticle;


store.subscribe(() => console.log('Look ma, Redux!!'));

console.log("hi")

store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );
store.dispatch( addArticle2({ name: 'React Redux Tutorial for Beginners', id: 2 }) );

console.log(store.getState());