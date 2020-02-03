import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthDesktop as Auth } from 'auth/src';
import { ListDesktop as Users } from 'users/src';
import App from './App';
import Profile from 'profile/containers/Profile';

const Routes: React.FC<{}> = (): JSX.Element => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <App>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/editProfile" component={Profile} />
      </Switch>
    </App>
  </Switch>
);

export default Routes;
