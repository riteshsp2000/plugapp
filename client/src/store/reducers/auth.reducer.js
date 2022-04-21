import { authActionTypes } from '@store/actions';

export default function authReducer(state, action) {
  switch (action.type) {
    case authActionTypes.UPDATE_AUTH_STATE:
      return {
        ...state,
        user: action.payload.user,
      };

    case authActionTypes.SIGNOUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
