const initialState = {
  records: [],
  posting: false,
  posted: false,
  erorr: null
}

const marker = (state = initialState, action) => {
  switch (action.type) {
    case 'POSTING_RECORD':
      return {
        ...state,
        posting: true,
        posted: false
      }
    case 'POSTED_RECORD_SUCCESS':
      return {
        ...state,
        posting: false,
        posted: true
      }
    case 'POSTED_RECORD_ERROR':
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      }
    default:
      return state
  }
}

export default marker;
