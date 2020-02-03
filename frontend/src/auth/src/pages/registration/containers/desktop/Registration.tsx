import { register, change } from '../../actions';
import Registration from '../../components/desktop/Registration';
import { connect } from 'react-redux';

export default connect(
  (state: any) => ({
    email: state.auth.registration.email,
    errors: state.auth.registration.errors,
    password: state.auth.registration.password,
    confirmPassword: state.auth.registration.confirmPassword
  }),
  dispatch => ({
    onRegister: () => dispatch(register()),
    onChangeEmail: value => dispatch(change('email', value)),
    onChangePassword: value => dispatch(change('password', value)),
    onChangeConfirmPassword: value => dispatch(change('confirmPassword', value))
  })
)(Registration);
