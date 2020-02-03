import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile, save, clearProfile } from '../actions';
import Profile from '../components/Profile';

const propsSelector = (state: any) => ({
  firstName: state.me.formFields.firstName,
  lastName: state.me.formFields.lastName,
  originFirstName: state.me.profile.firstName,
  originLastName: state.me.profile.lastName,
  errors: state.me.errors
});

const ProfileContainer: React.FC<any> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { originFirstName, originLastName, ...restProps } = useSelector(
    propsSelector
  );

  const onChangeFirstName = value => {
    dispatch(changeProfile('firstName', value));
  };

  const onChangeLastName = value => {
    dispatch(changeProfile('lastName', value));
  };

  const onSave = () => {
    dispatch(save());
  };

  React.useEffect(() => {
    onChangeFirstName(originFirstName);
    onChangeLastName(originLastName);
    return () => {
      dispatch(clearProfile());
    };
  }, []);

  return (
    <Profile
      {...restProps}
      onChangeFirstName={onChangeFirstName}
      onChangeLastName={onChangeLastName}
      onSave={onSave}
    />
  );
};

export default ProfileContainer;
