import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client'

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache,
})


const MyContext = React.createContext({
    apiClient: client
});

export default MyContext;