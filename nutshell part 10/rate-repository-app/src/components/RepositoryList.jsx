import { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import RepositorySortPicker from './RepositorySortPicker';
import TextInput from './TextInput';
import useRepositories from '../hooks/useRepositories';
import useDebounce from '../hooks/useDebounce';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchContainer: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryList = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryListContainer = () => {
  const [selectedSort, setSelectedSort] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearch = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    orderBy: selectedSort.orderBy,
    orderDirection: selectedSort.orderDirection,
    searchKeyword: debouncedSearch || undefined,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <RepositorySortPicker
            selectedSort={selectedSort}
            onChange={setSelectedSort}
          />
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Filter repositories"
              value={searchKeyword}
              onChangeText={setSearchKeyword}
            />
          </View>
        </>
      }
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryListContainer;
