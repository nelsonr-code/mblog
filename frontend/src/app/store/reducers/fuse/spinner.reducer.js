import * as Actions from "app/store/actions/fuse";

const initialState = {
  state: false
};

const spinner = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_SPINNER: {
      return {
        ...state,
        state: true
      };
    }
    case Actions.CLOSE_SPINNER: {
      return {
        ...state,
        state: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default spinner;
