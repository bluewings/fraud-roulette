import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from './app.store';

export default combineReducers({
  app: persistReducer({ key: 'app', storage }, app),
});
