import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType, RepoType } from "../shared/types"
interface SearchState {
  query: string
  category: string
  data: Array<UserType | RepoType>
}

const initialState: SearchState = {
  query: "",
  category: "",
  data: [],
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
