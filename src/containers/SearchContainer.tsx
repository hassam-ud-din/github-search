import React, { Fragment, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  fetchSearchResults,
  fetchScrollResults,
  setQuery,
  setSearchCategory,
} from "../features/dataSlice"
import CardList from "../components/CardList"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { CategoryType } from "../shared/types"
import { Divider, Layout, Alert } from "antd"
import LoadingCards from "../components/LoadingCards"
import Search from "../components/Search"
import { MIN_SEARCH_LENGTH } from "../shared/constants"

type Props = {
  categories: Array<CategoryType>
}

function SearchContainer({ categories }: Props) {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState<string>(
    useAppSelector((state) => state.data.query)
  )
  const { category, data, loading, error, loadingMore, nextPage, errorMore, hasMoreData } =
    useAppSelector((state) => state.data)
  const delayInMs: number = 1000

  const debouncedFetchSearchResults = useDebounce(async (category: string, query: string) => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      await dispatch(setQuery(searchTerm))
      await dispatch(fetchSearchResults({ category, query: searchTerm }))
    }
  }, delayInMs)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedFetchSearchResults(category, searchTerm)
  }

  const handleCategoryChange = (newCategory: string) => {
    dispatch(setSearchCategory(newCategory))
    debouncedFetchSearchResults(newCategory, searchTerm)
  }

  const fetchAndUpdateScrollResults = async () => {
    if (hasMoreData && !loadingMore)
      await dispatch(fetchScrollResults({ category, query: searchTerm, page: nextPage }))
  }

  const observerRef = useInfiniteScroll(fetchAndUpdateScrollResults)

  return (
    <Layout style={{ paddingBottom: searchTerm.length < MIN_SEARCH_LENGTH ? 0 : "1rem" }}>
      <Search
        searchTerm={searchTerm}
        categories={categories}
        selectedCategory={category}
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
      />
      {(error || errorMore) && (
        <Alert style={{ marginTop: "1rem" }} message={error} type="error" showIcon />
      )}
      {loading ? (
        <Fragment>
          <Divider />
          <LoadingCards />
        </Fragment>
      ) : (
        searchTerm.length >= MIN_SEARCH_LENGTH && (
          <Fragment>
            <Divider />
            <CardList category={category} cards={data} />
          </Fragment>
        )
      )}
      {!loading && !loadingMore && (
        <div
          style={{
            display: searchTerm.length < MIN_SEARCH_LENGTH ? "none" : "block",
          }}
          ref={observerRef}
        />
      )}
      {loadingMore && <LoadingCards />}
    </Layout>
  )
}

export default SearchContainer
