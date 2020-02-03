import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import * as actions from '../constants';
import { load } from 'profile/actions';
import { auth } from 'common/src/actions/security';

export const change = (field, value) => ({
  type: actions.change,
  field,
  value
});

export const register = () => async (dispatch, getState, client) => {
  const { email, password } = getState().auth.registration;

  const {
    data: {
      register: { errors, user, token, expiresIn }
    }
  } = await client.mutate({
    mutation: gql`
      mutation Register($input: RegisterUserInput!) {
        register(input: $input) {
          errors {
            email
            password
          }
        }
      }
    `,
    variables: {
      input: {
        email,
        password
      }
    }
  });

  if (!isEmpty(errors)) {
    dispatch({
      type: actions.setErrors,
      errors
    });
  } else {
    dispatch({
      type: actions.clear
    });
    dispatch(auth({ token, expiresIn }));
    dispatch(load(user));
  }
};

export const setErrors = errors => ({
  type: actions.setErrors,
  errors
});

export const clear = () => ({
  type: actions.clear
});
