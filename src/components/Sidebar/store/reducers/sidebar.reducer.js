import * as Actions from '../actions';
const initialState = {
  collapsed: true
}

const sidebar = (state = initialState, action) => {
  switch (action.type) {

    case Actions.TOGGLE_SIDEBAR: {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    }

    case Actions.SET_SIDEBAR_COLLAPSED: {
      return {
        ...state,
        collapsed: action.payload,
      };
    }
    
    default: return state;
  }
};

export default sidebar;
