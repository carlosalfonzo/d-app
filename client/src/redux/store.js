
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// REDUCERS
import web3Reducer from './web3Reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

function configureStore() {
  const middlewares = [
    thunk,
    reduxImmutableStateInvariant(),
    createPromise({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
  ];
  return createStore(
    appCombineReducer(),
    {},
    (composeEnhancers && composeEnhancers(applyMiddleware(...middlewares))) || applyMiddleware(...middlewares)
  );
};

function appCombineReducer() {
  return (
    combineReducers({
      web3Reducer
    })
  );
}

export const actions_suffix = {
  START: '_START',
  SUCCESS: '_SUCCESS',
  ERROR: '_ERROR'
}

export default configureStore;
