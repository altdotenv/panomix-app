import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store/configure";
import GlobalStyles from "./components/GlobalStyles";

import App from './components/App/';

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyles/>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;