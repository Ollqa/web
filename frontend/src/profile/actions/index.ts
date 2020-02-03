import gql from 'graphql-tag';
import { push } from 'connected-react-router';
import * as actions from '../constants';

export const changeProfile = (field, value) => ({
  type: actions.changeProfile,
  field,
  value
});

export const setErrors = errors => ({
  type: actions.setErrors,
  errors
});

export const save = () => async (dispatch, getState, client) => {
  const {
    profile: { firstName, lastName },
    id
  } = getState().me;

  try {
    const {
      data: {
        editProfile: { user, errors }
      }
    } = await client.query({
      fetchPolicy: 'network-only',
      query: gql`
        query EditProfile($firstName: String!, $lastName: String!) {
          editProfile(firstName: $email, lastName: $password) {
            user {
              id
              email
              profile {
                firstName
                lastName
              }
            }
            errors {
              id
            }
          }
        }
      `,
      variables: {
        firstName,
        lastName,
        id
      }
    });
    if (errors?.id) {
      dispatch({
        type: actions.setErrors,
        errors
      });
    } else {
      dispatch(load(user));
      dispatch(push('/'));
    }
  } catch (e) {
    dispatch({
      type: actions.clearProfile
    });
  }
};

export const clear = () => ({
  type: actions.clear
});

export const load = user => ({
  type: actions.load,
  user
});
