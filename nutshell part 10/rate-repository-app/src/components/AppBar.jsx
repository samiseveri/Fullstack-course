import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import Text from './Text';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  scroll: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 15,
    paddingVertical: 10,
  },
});

const AppBarTab = ({ to, label, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text color="white" fontWeight="bold" fontSize="subheading">
        {label}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const signOut = useSignOut();
  const currentUser = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab to="/" label="Repositories" />
        {currentUser ? (
          <>
            <AppBarTab to="/create-review" label="Create a review" />
            <AppBarTab to="/my-reviews" label="My reviews" />
            <AppBarTab label="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab to="/signin" label="Sign in" />
            <AppBarTab to="/signup" label="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
