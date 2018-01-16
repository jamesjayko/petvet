import { VET_LOGIN, VET_REGISTER } from "../actions/index";

const CURRENT_VET = {
  success: false,
  id: null,
  errorMessage: ""
};

export default function(state = CURRENT_VET, action) {
  switch (action.type) {
    case VET_LOGIN:
      console.log("ACTION ::::", action.payload);
      return {
        ...state,
        success: action.payload.data.loginSuccess,
        id: action.payload.data.ownerID,
        errorMessage: action.payload.data.errors[0]
      };
    case VET_REGISTER:
      console.log("RESTER WORKS", action);
      return {
        ...state,
        success: action.payload.data.success,
        id: action.payload.data.data.ID
      };
  }
  return state;
}