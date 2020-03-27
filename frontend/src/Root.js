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

{/* <BrowserRouter>
    <Route
        path="/"
        render={props => { const subdomain = window.location.hostname.split('.');
            if (subdomain && subdomain.length > 1)
            return <PartnerLayout {...props} subdomain={subdomain[0]}/>;
            return <AppLayout {...props}/>; }
        }
    />
</BrowserRouter> */}