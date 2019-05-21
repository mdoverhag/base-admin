import {
  ProfileParams,
  ProfileActionTypes,
  SET_PROFILE,
  UNSET_PROFILE
} from './types';

export const setProfile = (payload: ProfileParams): ProfileActionTypes => ({
  type: SET_PROFILE,
  payload
});

export const unsetProfile = (): ProfileActionTypes => ({
  type: UNSET_PROFILE
});
