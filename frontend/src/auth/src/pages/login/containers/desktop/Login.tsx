import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, login, clear } from '../../actions';
import Login from '../../components/desktop/Login';

const propsSelector = (state: any) => ({
  email: state.auth.login.email,
  password: state.auth.login.password,
  errors: state.auth.login.errors,
  pathname: state.router.location.pathname
});

const LoginContainer: React.FC<any> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pathname, ...restProps } = useSelector(propsSelector);

  React.useEffect(() => {
    return () => {
      dispatch(clear());
    };
  }, [pathname]);

  const onChangeEmail = value => {
    dispatch(change('email', value));
  };
  const onChangePassword = value => {
    dispatch(change('password', value));
  };
  const onLogin = () => {
    dispatch(login());
  };

  return (
    <Login
      {...restProps}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onLogin={onLogin}
    />
  );
};

export default LoginContainer;
