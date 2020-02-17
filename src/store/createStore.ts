import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import reducers from './reducers';

export default (initialState?: any) => {
  let composeEnhancers: any;
  try {
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } catch (err) {
    composeEnhancers = compose;
  }
  const enhancer = composeEnhancers();

  const store: any = createStore(reducers, initialState, enhancer);

  const persistor = persistStore(store);

  return { store, persistor };
};
