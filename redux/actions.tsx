import {ADD_USER, SET_FORM_DATA, SET_FORM_STATE, EDIT_USERS} from './types';

export const setUserDetails = (user) => (dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
};

export const setFormState = (state) => (dispatch) => {
  dispatch({
    type: SET_FORM_STATE,
    payload: state,
  });
};

export const setFormData = (state) => (dispatch) => {
  dispatch({
    type: SET_FORM_DATA,
    payload: state,
  });
};

export const editUsers = (users) => (dispatch) => {
  dispatch({
    type: EDIT_USERS,
    payload: users,
  });
};