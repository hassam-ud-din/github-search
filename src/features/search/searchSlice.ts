import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { octokit, searchGithub, OptionParams } from "../../services/api" // Assuming you have the API file
import { AppDispatch } from "../../app/store"

interface SearchState {
  category: string
  data: any // Modify the data type as per your response structure
}

const initialState: SearchState = {
  category: "",
  data: null,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSearchData: (state, action: PayloadAction<any>) => {
      state.data = action.payload
    },
  },
})

export const { setSearchCategory, setSearchData } = searchSlice.actions

export const searchAsync =
  (category: string, options: OptionParams) => async (dispatch: any) => {
    try {
      const data = await searchGithub(octokit, category, options)
      console.log("data", data)
      dispatch(setSearchData(data.items))
    } catch (error) {
      // Handle error, e.g., dispatch an action to show an error message
    }
  }

export default searchSlice.reducer
