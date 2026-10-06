import { render } from '@testing-library/react-native';
import { NativeRouter } from 'react-router-native';
import { RepositoryList } from '../RepositoryList';

describe('RepositoryListContainer', () => {
  it('renders repository information', () => {
    const repository = {
      id: 'jaredpalmer.formik',
      fullName: 'jaredpalmer/formik',
      description: 'Build forms in React, without the tears',
      language: 'TypeScript',
      forksCount: 1589,
      stargazersCount: 21553,
      ratingAverage: 88,
      reviewCount: 4,
      ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/4060187?v=4',
    };

    const { getByText } = render(
      <NativeRouter>
        <RepositoryList repositories={[repository]} />
      </NativeRouter>,
    );

    expect(getByText('jaredpalmer/formik')).toBeTruthy();
    expect(getByText('Build forms in React, without the tears')).toBeTruthy();
    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('Stars')).toBeTruthy();
    expect(getByText('Forks')).toBeTruthy();
    expect(getByText('Reviews')).toBeTruthy();
    expect(getByText('Rating')).toBeTruthy();
    expect(getByText('21.6k')).toBeTruthy();
    expect(getByText('1.6k')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('88')).toBeTruthy();
  });
});
