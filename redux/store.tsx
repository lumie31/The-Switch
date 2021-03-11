import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import usersReducer from './reducers';

const middleware = [thunk];
const initialState = {users: [], formState: "", formData: {}};

const store = createStore(
  usersReducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;