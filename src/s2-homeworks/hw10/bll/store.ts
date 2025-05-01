import { loadingReducer } from './loadingReducer'
import { combineReducers, legacy_createStore } from 'redux'
import { themeReducer } from '../../hw12/bll/themeReducer'

const reducers = combineReducers({
    loading: loadingReducer, // hw10
    theme: themeReducer,     // hw12
})

const store = legacy_createStore(reducers)

export default store

// Типы
export type AppStoreType = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store // for dev
