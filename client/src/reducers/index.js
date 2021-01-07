import {combineReducers} from 'redux';
import reducerMessage from './reducer.message';
import reducerUser from './reducer.user';
import reducerProject from './reducer.project';
import reducerTask from './reducer.task';

export default combineReducers({
  User: reducerUser,
  Message: reducerMessage,
  Project: reducerProject,
  Task: reducerTask,
});
