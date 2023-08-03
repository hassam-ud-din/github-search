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
import { Category } from "../shared/types"
import { Divider, Layout, Alert } from "antd"
import LoadingCards from "../components/LoadingCards"
import Search from "../components/Search"
import { MIN_SEARCH_LENGTH } from "../shared/constants"
import { Content, Header } from "antd/es/layout/layout"
import useStyles from "../hooks/useStyles"

function SearchContainer() {
  const categories: Array<Category> = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  const dispatch = useAppDispatch()

  const [searchTerm, setSearchTerm] = useState<string>(
    useAppSelector((state) => state.data.query)
  )

  const { category, data, loading, error, loadingMore, nextPage, errorMore, hasMoreData } =
    useAppSelector((state) => state.data)

  const delayInMs: number = 1000

  const debouncedFetchSearchResults = useDebounce(async (category: string) => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      await dispatch(setQuery(searchTerm))
      await dispatch(fetchSearchResults({ category, query: searchTerm }))
    }
  }, delayInMs)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedFetchSearchResults(category)
  }

  const handleCategoryChange = (newCategory: string) => {
    dispatch(setSearchCategory(newCategory))
    debouncedFetchSearchResults(newCategory)
  }

  const fetchAndUpdateScrollResults = async () => {
    if (hasMoreData && !loadingMore)
      await dispatch(fetchScrollResults({ category, query: searchTerm, page: nextPage }))
  }

  const observerRef = useInfiniteScroll(fetchAndUpdateScrollResults)

  const { styles } = useStyles()

  return (
    <Layout
      className={styles.container}
      style={{ paddingBottom: searchTerm.length < MIN_SEARCH_LENGTH ? 0 : "1rem" }}
    >
      <Header
        className={searchTerm.length < MIN_SEARCH_LENGTH ? styles.headerCenter : styles.header}
      >
        <Search
          searchTerm={searchTerm}
          categories={categories}
          selectedCategory={category}
          handleCategoryChange={handleCategoryChange}
          handleSearchChange={handleSearchChange}
        />
        {(error || errorMore) && (
          <Alert className={styles.alert} message={error} type="error" showIcon />
        )}
      </Header>

      <Content>
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
      </Content>
    </Layout>
  )
}

export default SearchContainer
