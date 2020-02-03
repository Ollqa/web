import * as actions from '../constants/security';

export const auth = ({ token, expiresIn }) => ({
  payload: { token, expiresIn },
  type: actions.auth
});

export const logout = () => ({
  type: actions.logout
});
