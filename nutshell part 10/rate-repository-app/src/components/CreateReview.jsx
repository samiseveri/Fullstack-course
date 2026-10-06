import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import TextInput from './TextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string().max(2000, 'Review text is too long'),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        error={
          formik.touched.repositoryName && Boolean(formik.errors.repositoryName)
        }
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        placeholder="Rating"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
        error={formik.touched.rating && Boolean(formik.errors.rating)}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        placeholder="Review text"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
        error={formik.touched.text && Boolean(formik.errors.text)}
      />
      {formik.touched.text && formik.errors.text && (
        <Text color="error" style={styles.errorText}>
          {formik.errors.text}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const review = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text: text || undefined,
      });

      navigate(`/repositories/${review.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
