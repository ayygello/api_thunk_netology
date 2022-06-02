import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import serviceListReducer from '../reducers/serviceList';
import serviceAddReducer from '../reducers/serviceAdd';
import serviceEditReducer from '../reducers/serviceEdit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
  serviceEdit: serviceEditReducer,
});

const store = legacy_createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))

  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
