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
  const [urlQuery] = useState<string | null>(searchParams.get('q'))
  const [urlCategory] = useState<string | null>(searchParams.get('category'))

  const [searchTerm, setSearchTerm] = useState<string>(urlQuery ? urlQuery : persistedQuery)
  const [category, setCategory] = useState<string>(
    urlCategory ? urlCategory : persistedCategory
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

  const searchParamsValid =
    urlQuery &&
    urlCategory &&
    categories.some((category) => category.value === urlCategory) &&
    (persistedQuery !== urlQuery || persistedCategory !== urlCategory)

  useEffect(() => {
    if (searchParamsValid) debouncedFetchSearchResults(category)
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
