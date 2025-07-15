import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: "dark",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
