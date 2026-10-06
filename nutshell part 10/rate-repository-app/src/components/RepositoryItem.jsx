import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  description: {
    marginTop: 5,
    marginBottom: 8,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item, single }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    if (!single) {
      navigate(`/repositories/${item.id}`);
    }
  };

  const openInGitHub = () => {
    Linking.openURL(item.url);
  };

  const content = (
    <>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <StatItem label="Stars" value={item.stargazersCount} />
        <StatItem label="Forks" value={item.forksCount} />
        <StatItem label="Reviews" value={item.reviewCount} />
        <StatItem label="Rating" value={item.ratingAverage} />
      </View>
      {single && (
        <Pressable style={styles.linkButton} onPress={openInGitHub}>
          <Text color="white" fontWeight="bold">
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </>
  );

  if (single) {
    return (
      <View style={styles.container} testID="repositoryItem">
        {content}
      </View>
    );
  }

  return (
    <Pressable
      style={styles.container}
      testID="repositoryItem"
      onPress={handlePress}
    >
      {content}
    </Pressable>
  );
};

export default RepositoryItem;
