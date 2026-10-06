import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 12,
    marginBottom: 8,
    fontFamily: theme.fonts.main,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
