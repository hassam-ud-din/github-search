import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface SearchState {
  query: string
  category: string
  data: any // Modify the data type as per your response structure
}

const initialState: SearchState = {
  query: "",
  category: "",
  data: null,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSearchData: (state, action: PayloadAction<any>) => {
      state.data = action.payload
    },
  },
})

export const { setQuery, setSearchCategory, setSearchData } = searchSlice.actions

export default searchSlice.reducer
