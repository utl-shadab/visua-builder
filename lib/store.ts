import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./features/theme/themeSlice"
import emailReducer from "./features/email/emailSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    email: emailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
