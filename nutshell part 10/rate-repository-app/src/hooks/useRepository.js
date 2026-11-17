import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first = 3) => {
  const { data, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORY,
    {
      variables: { id, first },
      skip: !id,
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
