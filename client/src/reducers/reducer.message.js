import {TypeMap} from '../actions/index';
export default (state = {}, action) => {
  const {payload} = action;

  switch (action.type) {
    case TypeMap.CATEGORY_UPDATE:
    case TypeMap.CATEGORY_DETAIL:
      state.detail = payload;
    case TypeMap.CATEGORY_LIST:
      state.list = payload;
      break;
    case TypeMap.CATEGORY_LIST_ALL:
      state.all = payload;
      break;
    case TypeMap.CATEGORY_DELETE:
      state.delete = payload;
      break;
    default:
  }

  return state;
};
