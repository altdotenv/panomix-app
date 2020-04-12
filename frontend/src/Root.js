import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store/configure";
import GlobalStyles from "./components/GlobalStyles";
import { Helmet } from "react-helmet"

import App from './components/App/';

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyles/>
        <Helmet><title>Panomix</title></Helmet>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;