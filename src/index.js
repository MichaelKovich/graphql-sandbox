import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import './index.css';
import App from './App';

// Opening connection between front-end and GraphQL instance using the Apollo client
const client = new ApolloClient({uri: 'http://localhost:3001/graphql'});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
