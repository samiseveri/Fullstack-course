import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async (user) => {
    const { data } = await mutate({
      variables: { user },
    });

    return data.createUser;
  };

  return [createUser, result];
};

export default useCreateUser;
