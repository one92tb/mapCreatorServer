const initialState = {
  selectedMarker : '',
  selectedMarkers: [],
  posting: false,
  posted: false,
  fetching: false,
  fetched: false,
  removing: false,
  removed: false,
  error: null
}

const selectedMarker = (state = initialState, action) => {
  switch(action.type){
    case 'GET_SELECTED_MARKER':
      return {
        ...state,
        selectedMarker: action.marker
      }
    case 'FETCHING_MARKERS':
      return {
        ...state,
        fetching: true,
        fetched: false
      }
    case 'FETCHED_MARKERS_SUCCESS':
      return {
        ...state,
        fetching: false,
        fetched: true,
        selectedMarkers: action.markers
      }
    case 'FETCHED_MARKERS_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      }
    case 'POSTING_SELECTED_MARKER':
      return {
        ...state,
        posting: true,
        posted: false,
      }
    case 'POSTED_SELECTED_MARKER_SUCCESS':
      return{
        ...state,
        posting: false,
        posted: true,
        selectedMarkers: [...state.selectedMarkers, action.marker]
      }
    case 'POSTED_SELECTED_ERROR':
      return{
        ...state,
        posting: false,
        posted: false,
        error: action.error
      }
    case 'REMOVING_SELECTED_MARKER':
      return{
        ...state,
        removing: true,
        removed: false,
      }
    case 'REMOVED_SELECTED_MARKER_SUCCESS':
      return{
        ...state,
        removing: false,
        removed: true,
        selectedMarkers: state.selectedMarkers.filter(el => el.id !== action.id)
      }
    case 'REMOVED_SELECTED_MARKER_ERROR':
      return{
        ...state,
        removing: false,
        removed: false,
        error: action.error
      }
    default:
      return state
  }
}

export default selectedMarker;
