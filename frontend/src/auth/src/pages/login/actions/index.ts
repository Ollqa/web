import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import { auth } from 'common/src/actions/security';
import * as actions from '../constants';
import stub from './stub';
import { load } from 'profile/actions';

export const change = (field, value) => ({
  type: actions.change,
  field,
  value
});

export const clear = () => ({
  type: actions.clear
});

export const login = () => async (dispatch, getState, client) => {
  const { email, password } = getState().auth.login;

  try {
    const {
      data: {
        login: {
          token: { token, expiresIn },
          user,
          errors
        }
      }
    } = await client.query({
      fetchPolicy: 'network-only',
      query: gql`
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token {
              token
              expiresIn
            }
            errors {
              email
              password
            }
            user {
              id
              email
              profile
            }
          }
        }
      `,
      variables: {
        email,
        password
      }
    });

    if (!isEmpty(errors) && (errors.email || errors.password)) {
      dispatch({
        type: actions.setErrors,
        errors
      });
    } else {
      dispatch(clear());
      dispatch(auth({ token, expiresIn }));
      dispatch(load(user));
    }
  } catch (e) {
    // dispatch({
    //   type: auth,
    //   token: stub.token,
    //   expiresIn: stub.expiresIn
    // });

    dispatch(clear());
  }
};
