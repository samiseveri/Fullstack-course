import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    marginTop: 10,
  },
  rating: {
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const RepositoryReviewItem = ({ review }) => {
  return (
    <View style={styles.container} testID="repositoryReviewItem">
      <Text fontWeight="bold" style={styles.rating}>
        Rating: {review.rating}
      </Text>
      <Text>{review.text}</Text>
      <Text color="textSecondary">{review.user.username}</Text>
    </View>
  );
};

export const MyReviewItem = ({ review, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(review.id) },
    ]);
  };

  const viewRepository = () => {
    navigate(`/repositories/${review.repository.id}`);
  };

  return (
    <View style={styles.container} testID="myReviewItem">
      <Text fontWeight="bold" fontSize="subheading">
        {review.repository.fullName}
      </Text>
      <Text fontWeight="bold" style={styles.rating}>
        Rating: {review.rating}
      </Text>
      <Text>{review.text}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={viewRepository}>
          <Text color="white" fontWeight="bold">
            View repository
          </Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text color="white" fontWeight="bold">
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RepositoryReviewItem;
