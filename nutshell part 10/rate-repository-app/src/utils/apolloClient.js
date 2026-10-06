import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';

const apolloUri =
  Constants.expoConfig?.extra?.apolloUri ||
  process.env.EXPO_PUBLIC_APOLLO_URI;

const createApolloClient = (authStorage) => {
  // eslint-disable-next-line no-console
  console.log('Apollo URI:', apolloUri);

  const httpLink = createHttpLink({
    uri: apolloUri,
  });

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch {
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
