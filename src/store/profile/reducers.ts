import {
  ProfileState,
  ProfileActionTypes,
  SET_PROFILE,
  UNSET_PROFILE
} from './types';

const initialState: ProfileState = {};

export const profileReducer = (
  state = initialState,
  action: ProfileActionTypes
) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        loggedIn: true,
        email: action.payload.email
      };
    case UNSET_PROFILE:
      return initialState;
    default:
      return state;
  }
};
