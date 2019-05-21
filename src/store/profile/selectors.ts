import { createSelector } from 'reselect';

import defaultTo from 'lodash/defaultTo';

import { State } from '../../store';

const getProfile = (state: State) => state.profile;

export const getIsLoggedIn = createSelector(
  getProfile,
  profile => !!profile.loggedIn
);

export const getEmail = createSelector(
  getProfile,
  profile => defaultTo(profile.email, '')
);
