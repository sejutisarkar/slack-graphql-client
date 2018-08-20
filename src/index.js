import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:8081/graphql',
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql',
  }),
  cache: new InMemoryCache()
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
