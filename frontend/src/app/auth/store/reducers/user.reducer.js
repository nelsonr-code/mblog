import * as Actions from "../actions";

const initialState = {
  role: [], //guest
  data: {
    displayName: "John Doe",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
    configurations: {},
    roles: [],
    active: false,
    firstName: "",
    lastName: "",
    isAdmin: false
  },
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      console.log("por aqui", action.payload)
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
