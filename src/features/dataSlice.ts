import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserType, RepoType } from "../shared/types"
import { CARDS_PER_PAGE } from "../shared/constants"
import { searchGithub } from "../services/api"

type FetchResultsPayload = {
  category: string
  query: string
  page?: number
}

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ category, query }: FetchResultsPayload, { rejectWithValue }) => {
    try {
      const options = {
        q: query,
        per_page: CARDS_PER_PAGE,
      }
      const data = await searchGithub(category, options)
      return data.items
    } catch (error) {
      return rejectWithValue("An error occurred when searching for results. Please try again.")
    }
  }
)

export const fetchScrollResults = createAsyncThunk(
  "search/fetchScrollResults",
  async ({ category, query, page }: FetchResultsPayload, { rejectWithValue }) => {
    try {
      const options = {
        q: query,
        per_page: CARDS_PER_PAGE,
        page,
      }
      const data = await searchGithub(category, options)
      return data.items
    } catch (error) {
      return rejectWithValue("An error occurred when searching for results. Please try again.")
    }
  }
)

type DataState = {
  query: string
  category: string
  data: Array<UserType | RepoType>
  loading: boolean
  error: string | null
  nextPage: number
  hasMoreData: boolean
  loadingMore: boolean
  errorMore: string | null
}

const initialState: DataState = {
  query: "",
  category: "users",
  data: [],
  loading: false,
  error: null,
  nextPage: 1,
  hasMoreData: true,
  loadingMore: false,
  errorMore: null,
}

const dataSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true
        state.error = null
        state.nextPage = 2
        state.hasMoreData = true
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.data = action.payload
        state.error = null
        state.loading = false
        state.hasMoreData = action.payload.length > 0 ? true : false
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchScrollResults.pending, (state) => {
        state.loadingMore = true
        state.errorMore = null
      })
      .addCase(fetchScrollResults.fulfilled, (state, action) => {
        state.data.push(...action.payload)
        state.hasMoreData = action.payload.length > 0 ? true : false
        state.nextPage = state.nextPage + 1
        state.errorMore = null
        state.loadingMore = false
      })
      .addCase(fetchScrollResults.rejected, (state, action) => {
        state.loadingMore = false
        state.errorMore = action.payload as string
      })
  },
})

export const { setQuery, setSearchCategory } = dataSlice.actions

export default dataSlice.reducer
