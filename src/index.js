import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:8081/graphql',
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

// const authLink = setContext((_, {headers}) => {
//   //get the token from localStorage
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken')
//   //return the headers to the context so that httplink can read them
//   return {
//     ...headers,
//     authorization: token ? `Bearer ${token}` : "",
//   }
// });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
});


const otherMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('refreshToken') || null,
    }
  }));

  return forward(operation);
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

    }
    return response;
  });
});

const client = new ApolloClient({
  // link: from([
  //   authMiddleware,
  //   otherMiddleware,
  //   httpLink
  // ]),
  link: ApolloLink.from([authMiddleware, otherMiddleware, httpLink]),
   cache: new InMemoryCache()
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
