import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws'
import App from './App.jsx'

const httpUri =
  import.meta.env.VITE_GRAPHQL_HTTP ||
  (import.meta.env.DEV ? 'http://localhost:4000/graphql' : '/graphql')

const wsUri =
  import.meta.env.VITE_GRAPHQL_WS ||
  (import.meta.env.DEV
    ? 'ws://localhost:4000/graphql'
    : `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/graphql`)

const httpLink = new HttpLink({
  uri: httpUri,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUri,
  }),
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
