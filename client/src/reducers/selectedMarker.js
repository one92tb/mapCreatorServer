const initialState = {
  selectedMarker : null,
  selectedMarkers: [],
  error: null
}

const selectedMarker = (state = initialState, action) => {
  switch(action.type){
    case 'GET_SELECTED_MARKER':
      return {
        ...state,
        selectedMarker: action.marker
      }
    case 'POSTING_SELECTED_MARKER':
      return {
        ...state,
      }
    case 'POSTED_SELECTED_MARKER_SUCCESS':
      return{
        ...state,
        selectedMarkers: [...state.selectedMarkers, action.marker]
      }
    case 'POSTED_SELECTED_ERROR':
      return{
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default selectedMarker;
