import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { logout } from 'common/src/actions/security';
import Header from '../../components/desktop/Header';

export default connect(
  (state: any) => ({
    firstName: state.me.profile.firstName,
    lastName: state.me.profile.lastName
  }),
  dispatch => ({
    onLogout: () => dispatch(logout()),
    onEditProfile: () => dispatch(push('/editProfile'))
  })
)(Header);
