import { useMutation } from '@apollo/client/react';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: { id },
    });

    return data.deleteReview;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
