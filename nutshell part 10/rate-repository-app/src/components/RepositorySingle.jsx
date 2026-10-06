import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySingle = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) {
    return null;
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryItem item={repository} single />
      }
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default RepositorySingle;
