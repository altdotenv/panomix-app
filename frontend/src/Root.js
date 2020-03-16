import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store, { history } from "./store/configure";
import App from './components/App/';

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
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