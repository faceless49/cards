import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "../reducers/auth";
import { profileReducer } from "../reducers/profile";
import { appReducer } from "../reducers/app";
import { loginReducer } from "../reducers/loginReducer";
import { registrationReducer } from "../reducers/registration";
import { restoreReducer } from "../reducers/restore";
import { packReducer } from "../reducers/packReducer";
import { cardsReducer } from "../reducers/cards";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  app: appReducer,
  login: loginReducer,
  register: registrationReducer,
  restore: restoreReducer,
  packPage: packReducer,
  cards: cardsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

//@ts-ignore
window.store = store;
