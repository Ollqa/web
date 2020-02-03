import { connect } from 'react-redux';
import { changeProfile, save } from '../actions';
import Profile from '../components/Profile';

export default connect(
  (state: any) => ({
    firstName: state.me.profile.firstName,
    lastName: state.me.profile.lastName,
    errors: state.me.errors
  }),
  dispatch => ({
    onChangeFirstName: value => {
      dispatch(changeProfile('firstName', value));
    },
    onChangeLastName: value => {
        dispatch(changeProfile('lastName', value))
    },
    onSave: () => dispatch(save())
  })
)(Profile);
