import React, { useEffect } from 'react';

// Libraries
import { onAuthStateChanged } from 'firebase/auth';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

// Components
import { ActivityIndicator } from '@components';

// Helpers
import history from '../utils/history';
import { useFirebase } from '@config/firebase';

// Asynchronous Loading of Pages in different chunks
const AsyncHome = Loadable({
  loader: () => import('./Home'),
  loading: ActivityIndicator,
});

const AsyncLogin = Loadable({
  loader: () => import('./Login'),
  loading: ActivityIndicator,
});

// Function to check the Authenticated status.
// const isAuthenticated = () => {
//   // Check the authentication state as per your way of authentication i.e. jwt, sessions, etc
// };

// Use this Route component for authenticated Routes.
// eslint-disable-next-line no-unused-vars
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to='/login' />)}
//   />
// );

function App() {
  const { auth } = useFirebase();

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
          const uid = user.uid;
        } else {
          history.push('/login');
        }
      });
    }
  }, [auth]);

  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={AsyncHome} />
        <Route path='/login' exact component={AsyncLogin} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
