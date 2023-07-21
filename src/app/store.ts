import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/es/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import thunk from "redux-thunk"
import searchReducer from "../features/searchSlice"
import themeReducer from "../features/themeSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["search"],
}

const rootReducer = combineReducers({
  theme: themeReducer,
  search: searchReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = (dispatch: any) => Promise<void>
