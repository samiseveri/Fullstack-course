import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
});

const SORT_OPTIONS = [
  {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

const RepositorySortPicker = ({ selectedSort, onChange }) => {
  return (
    <View style={styles.container}>
      {SORT_OPTIONS.map((option) => {
        const isSelected =
          selectedSort.orderBy === option.orderBy &&
          selectedSort.orderDirection === option.orderDirection;

        return (
          <Pressable
            key={option.label}
            style={[styles.option, isSelected && styles.selected]}
            onPress={() => onChange(option)}
          >
            <Text color={isSelected ? 'white' : 'primary'}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RepositorySortPicker;
