export interface ProfileState {
  loggedIn?: boolean;
  email?: string;
}

export interface ProfileParams {
  email: string;
}

export const SET_PROFILE = 'SET_PROFILE';
export const UNSET_PROFILE = 'UNSET_PROFILE';

interface SetProfileAction {
  type: typeof SET_PROFILE;
  payload: ProfileParams;
}

interface UnsetProfileAction {
  type: typeof UNSET_PROFILE;
}

export type ProfileActionTypes = SetProfileAction | UnsetProfileAction;
