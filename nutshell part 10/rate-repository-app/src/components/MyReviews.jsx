import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { MyReviewItem } from './ReviewItem';
import { GET_MY_REVIEWS } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_MY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useDeleteReview();

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <MyReviewItem review={item} onDelete={handleDelete} />
      )}
    />
  );
};

export default MyReviews;
