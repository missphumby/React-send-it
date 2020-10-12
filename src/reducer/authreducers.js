
      
export const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null
};
export const authreducer = (state=initialAuthState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.getItem("user", JSON.stringify(action.payload.user));
      localStorage.getItem("token", JSON.stringify(action.payload.token));
      console.log(action.payload.user)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: ''
        
      };
      case 'LOGIN_FAIL':
			return {
        ...state,
				isAuthenticated: false,
				user: null,
				error: action.payload.error
			};
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
// } from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// export const initialAuthState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

// export const authreducer = (state = initialAuthState, action) =>{
//   const { type, payload } = action;

//   switch (type) {
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case REGISTER_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         user: payload.user,
//       };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }