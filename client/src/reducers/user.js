const initialState = {
  users: [],
  errorr: null,
  fetching: false,
  fetched: false,
  posting: false,
  posted: false,
  postingLogin: false,
  postedLogin: false,
  isAuthorized: false,
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
        posted: false
      };
    case "POSTED_USER_SUCCES":
      return {
        ...state,
        posting: false,
        posted: true,
        users: [...state.users, action.user]
      };
    case "POSTED_USER_ERRROR":
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default user;
