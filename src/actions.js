import {CHANGE_SEARCH_FIELD} from './constants'

export const setSearchFeild = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})