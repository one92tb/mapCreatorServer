const initialState = {
  users: [],
  error: null,
  success: "",
  isAdmin: false,
  userId: "",
  userName: "",
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  postingLogin: false,
  postedLogin: false,
  isLoggingIn: false,
  changingPermissions: false,
  changedPermissions: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_USERS":
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    case "FETCHED_USERS_SUCCESS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.users
      };
    case "FETCHED_USERS_ERROR":
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case "POSTING_USER":
      return {
        ...state,
        posting: true,
        posted: false,
        error: null
      };
    case "POSTED_USER_SUCCESS":
      return {
        ...state,
        posting: false,
        posted: true,
        success: "The account has been created",
        users: [...state.users, action.user]
      };
    case "POSTED_USER_ERROR":
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      };
    case "RESET_REGISTER_ERROR":
      return {
        ...state,
        error: null
      };
    case "RESET_REGISTER_SUCCESS":
      return {
        ...state,
        success: ""
      };
    case "CHANGING_PERMISSIONS":
      return {
        ...state,
        changingPermissions: true,
        changedPermissions: false
      };
    case "CHANGED_PERMISSIONS_SUCCESS":
      return {
        ...state,
        changingPermissions: false,
        changedPermissions: true,
        isAdmin: action.status
      };
    case "CHANGED_PERMISSIONS_ERROR":
      return {
        ...state,
        changingPermissions: false,
        changedPermissions: false,
        error: action.error
      };
    case "DELETING_ACCOUNT":
      return {
        ...state,
        deletingAccount: true,
        deletedAccount: false
      };
    case "DELETED_ACCOUNT_SUCCESS":
      return {
        ...state,
        deletingAccount: false,
        deletedAccount: true,
        users: state.users.filter(user => user.id !== action.id)
      };
    case "DELETED_ACCOUNT_ERROR":
      return {
        ...state,
        deletingAccount: false,
        deletedAccount: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default user;
