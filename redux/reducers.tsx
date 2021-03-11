import { ADD_USER, SET_FORM_STATE, SET_FORM_DATA, EDIT_USERS } from "./types";

const initialState = {
  users: [],
  formState: "new",
  formData: {}
};

const usersReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case SET_FORM_STATE:
      return { ...state, formState: action.payload };

    case SET_FORM_DATA:
      return { ...state, formData: action.payload };

    case EDIT_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
}

export default usersReducer