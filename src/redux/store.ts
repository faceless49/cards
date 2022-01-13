import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {authReducer} from '../reducers/auth';
import {profileReducer} from '../reducers/profile';
import {appReducer} from '../reducers/app';
import {loginReducer} from "../reducers/loginReducer";
import {registrationReducer} from "../reducers/registration";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  app: appReducer,
  login: loginReducer,
  register:registrationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store