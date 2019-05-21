import { createStore, combineReducers } from 'redux';

import { profileReducer } from './profile/reducers';

const rootReducer = combineReducers({
  profile: profileReducer
});

export type State = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
