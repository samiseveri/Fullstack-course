import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../SignIn';

describe('SignIn', () => {
  it('calls onSubmit with username and password', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SignInForm onSubmit={onSubmit} />,
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByTestId('signInButton'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'kalle',
      password: 'password',
    });
  });
});
