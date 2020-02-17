import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes } from './pages';
import createStore from './store/createStore';

const { store, persistor } = createStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
