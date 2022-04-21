import React, { useReducer, useMemo, createContext, useContext } from 'react';

import { authInitialState } from '@store/actions';
import { authReducer } from '@store/reducers';

const AuthContext = createContext(authInitialState);

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useCompose must be used within a ComposeProvider');

  const [state, dispatch] = context;
  return [state, dispatch];
}
