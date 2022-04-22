import React, { useEffect, useState } from 'react';

// Libraries
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// Components
import { ActivityIndicator, Header } from '@components';

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
  const { auth, db } = useFirebase();
  const [state, dispatch] = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async (uid) => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });

      dispatch({
        type: authActionTypes.UPDATE_AUTH_STATE,
        payload: {
          user: users[0],
        },
      });
    });
  };

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          fetchData(user.uid);
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
      {isLoggedIn && <Header />}
      <Switch>
        <PrivateRoute path='/' exact component={AsyncHome} />
        <Route path='/login' exact component={AsyncLogin} />
      </Switch>
    </Router>
  );
}

export default App;
