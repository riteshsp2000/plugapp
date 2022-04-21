import React, { useEffect, useState } from 'react';

// Libraries
import { onAuthStateChanged } from 'firebase/auth';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// Components
import { ActivityIndicator } from '@components';

// Helpers
import createBrowserHistory from '../utils/history';
import { useFirebase } from '@config/firebase';
import { useAuth } from '@store/contexts';
import { authActionTypes } from '@store/actions';

// Asynchronous Loading of Pages in different chunks
const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: ActivityIndicator,
});

const AsyncLogin = Loadable({
  loader: () => import('./Login'),
  loading: ActivityIndicator,
});

function App() {
  const { auth } = useFirebase();
  const [, dispatch] = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          dispatch({
            type: authActionTypes.UPDATE_AUTH_STATE,
            payload: {
              user: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              },
            },
          });
          createBrowserHistory.push('/');
        } else {
          setIsLoggedIn(false);
          dispatch({
            type: authActionTypes.SIGNOUT_USER,
          });
        }
      });
    }
  }, [auth]);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );

  return (
    <Router history={createBrowserHistory}>
      <Switch>
        <PrivateRoute path='/' exact component={AsyncHome} />
        <Route path='/login' exact component={AsyncLogin} />
      </Switch>
    </Router>
  );
}

export default App;
