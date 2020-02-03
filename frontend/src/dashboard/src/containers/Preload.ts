import * as React from 'react';
import { connect } from 'react-redux';

const isAuthPathName = (pathname):boolean =>
    /^\/auth/.test(pathname);

const Preload: React.FC<any> = (props): JSX.Element => {
  const { token, onAuth, onMain, pathname } = props;

  React.useEffect(() => {
    if (!!token) {
      onMain();
    } else if (!isAuthPathName(pathname)) {
      onAuth();
    }

    if (token && isAuthPathName(pathname)) {
      onMain();
    }
  }, []);

  const prevToken = React.useRef(token);

  React.useEffect(() => {
    if ((!prevToken.current && token) || (token && isAuthPathName(pathname))) {
      onMain();
    } else if (!token && pathname !== '/auth/registration') {
      onAuth();
    }
    prevToken.current = token;
  }, [token, pathname]);

  const { children } = props;

  return children;
};

export default connect(
  (state: any) => ({
    token: state.security.token,
    pathname: state.router.location.pathname
  }),
  (dispatch, { history }) => ({
    onAuth: () => history.replace('/auth'),
    onMain: () => history.replace('/')
  })
)(Preload);
