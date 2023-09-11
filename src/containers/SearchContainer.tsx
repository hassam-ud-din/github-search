import React, { Fragment, useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchSearchResults,
  fetchScrollResults,
  setQuery,
  setSearchCategory,
} from '../features/dataSlice'
import CardList from '../components/CardList'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { Category } from '../shared/types'
import { Divider, Layout, Alert } from 'antd'
import LoadingCards from '../components/LoadingCards'
import Search from '../components/Search'
import { MIN_SEARCH_LENGTH } from '../shared/constants'
import { Content, Header } from 'antd/es/layout/layout'
import useStyles from '../hooks/useStyles'
import { useSearchParams } from 'react-router-dom'

function SearchContainer() {
  const [searchParams, setSearchParams] = useSearchParams()

  const categories: Array<Category> = [
    { value: 'users', label: 'User' },
    { value: 'repositories', label: 'Repos' },
  ]

  const dispatch = useAppDispatch()

  const persistedQuery = useAppSelector((state) => state.data.query)
  const persistedCategory = useAppSelector((state) => state.data.category)

  // get the query and category from url
  const url = { query: searchParams.get('q'), category: searchParams.get('category') }

  // use the url query if it's valid
  const [searchTerm, setSearchTerm] = useState<string>(url.query ? url.query : persistedQuery)

  // use the url category if it's valid
  const isCategoryValid = categories.some((item) => item.value === url.category)
  const [category, setCategory] = useState<string>(
    isCategoryValid ? url.category! : persistedCategory
  )

  const { data, loading, error, loadingMore, nextPage, errorMore, hasMoreData } =
    useAppSelector((state) => state.data)

  const delayInMs: number = 1000

  const debouncedFetchSearchResults = useDebounce(async (category: string) => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      await dispatch(setSearchCategory(category))
      await dispatch(setQuery(searchTerm))
      await dispatch(fetchSearchResults({ category, query: searchTerm }))
    }
  }, delayInMs)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    setSearchParams((params) => {
      params.set('q', newSearchTerm)
      return params
    })
    setSearchTerm(newSearchTerm)
    debouncedFetchSearchResults(category)
  }

  const handleCategoryChange = (newCategory: string) => {
    setSearchParams((params) => {
      params.set('category', newCategory)
      return params
    })
    setCategory(newCategory)
    debouncedFetchSearchResults(newCategory)
  }

  const fetchAndUpdateScrollResults = async () => {
    if (hasMoreData && !loadingMore)
      await dispatch(fetchScrollResults({ category, query: searchTerm, page: nextPage }))
  }

  // sync the router with the search on page load
  useEffect(() => {
    setSearchParams((params) => {
      params.set('q', searchTerm)
      params.set('category', category)
      return params
    })
  }, [])

  // fetch results when search parameters change
  useEffect(() => {
    if (persistedQuery !== searchTerm || persistedCategory !== category)
      debouncedFetchSearchResults(category)
  }, [searchParams])

  const observerRef = useInfiniteScroll(fetchAndUpdateScrollResults)

  const { styles } = useStyles()

  return (
    <Layout
      className={styles.container}
      style={{ paddingBottom: searchTerm.length < MIN_SEARCH_LENGTH ? 0 : '1rem' }}
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
              display: searchTerm.length < MIN_SEARCH_LENGTH ? 'none' : 'block',
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
