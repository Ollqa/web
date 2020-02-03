import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { History } from 'history';
import { ThemeProvider } from 'ui/theme';
import IntlProvider from '../IntlProvider';
import Preload from '../Preload';
import Routes from './Routes';
import { ConnectedRouter } from 'connected-react-router';

interface RootProps {
  history: History;
  store: any;
  persistor: any;
}

const Root = ({ store, persistor, history }: RootProps) => (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <Preload history={history}>
      <IntlProvider locale="ru">
        <ThemeProvider>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </ThemeProvider>
      </IntlProvider>
    </Preload>
    {/* </PersistGate> */}
  </Provider>
);

export default Root;
