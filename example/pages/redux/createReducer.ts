import { combineReducers } from 'redux'
// Thirdy apps
import { reducer as mobilizationReducer } from 'bonde-webpages'
import { reducer as intlReducer } from './intlReducer'

// Source Request reducer
const LOAD_SOURCE_REQUEST = 'sourceRequest/LOAD_SOURCE_REQUEST'
const sourceReqInitialState = {
  host: '',
  protocol: ''
}
export const sourceReqCreateReducer = (initialState: any) =>
  (state: any = initialState, action: any = {}) => {
    switch (action.type) {
      case LOAD_SOURCE_REQUEST:
        return Object.assign({}, state, action.payload)
      default:
        return state
    }
  }

// createReducer
export default (initialState: any = {}) => combineReducers({
  intl: intlReducer,
  sourceRequest: sourceReqCreateReducer(sourceReqInitialState),
  mobilizations: mobilizationReducer,
  ...initialState
})