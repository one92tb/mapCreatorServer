const initialState = {
  userId: "",
  userName: "",
  error: "",
  isLoggingIn: false,
  isAuthorized: false
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isLoggingIn: true,
        isAuthorized: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isAuthorized: action.userData.isAuthorized,
        userName: action.userData.userName,
        userId: action.userData.userId,
        error: action.userData.error
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.errror
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthorized: action.userData.isAuthorized,
        userName: action.userData.userName,
        userId: action.userData.userId,
        error: action.userData.error
      };
    default:
      return state;
  }
};

export default account;
