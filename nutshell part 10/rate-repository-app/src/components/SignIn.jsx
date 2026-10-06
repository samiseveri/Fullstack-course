import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import TextInput from './TextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  errorText: {
    marginBottom: 8,
    marginTop: -4,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        error={formik.touched.username && Boolean(formik.errors.username)}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
        error={formik.touched.password && Boolean(formik.errors.password)}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="signInButton"
      >
        <Text color="white" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
