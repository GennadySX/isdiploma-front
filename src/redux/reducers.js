import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import users from './user/reducer';
import chatApp from './chat/reducer';
const reducers = combineReducers({
  menu,
  settings,
  users,
  chatApp
});

export default reducers;