import React, { Fragment, useState, useCallback } from "react"
import useDebounce from "../hooks/useDebounce"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setQuery, setSearchCategory, setSearchData } from "../features/searchSlice"
import { searchGithub } from "../services/api"
import CardList from "../components/CardList"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { APIOptions, CategoryType, RepoType, UserType } from "../shared/types"
import { Divider, Layout, Alert } from "antd"
import LoadingCards from "../components/LoadingCards"
import Search from "../components/Search"
import { CARDS_PER_PAGE, MIN_SEARCH_LENGTH } from "../shared/constants"

type Props = {
  categories: Array<CategoryType>
}

function SearchContainer({ categories }: Props) {
  const dispatch = useAppDispatch()
  const delayInMs: number = 1000
  const [nextPage, setNextPage] = useState<number>(2)
  const [loading, setLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string>(
    useAppSelector((state) => state.search.category) || categories[0].value
  )

  const [results, setResults] = useState<Array<UserType | RepoType>>(
    useAppSelector((state) => state.search.data)
  )

  const [searchTerm, setSearchTerm] = useState<string>(
    useAppSelector((state) => state.search.query)
  )

  // callback function for useDebounce hook
  const search = useCallback(async () => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      try {
        setError(null)
        setHasMoreResults(true)
        setLoading(true)

        const options: APIOptions = {
          q: searchTerm,
          per_page: CARDS_PER_PAGE,
        }
        const data = await searchGithub(selectedCategory, options)

        if (data.items.length === 0) {
          setHasMoreResults(false)
          setError("No results found")
        } else {
          dispatch(setQuery(searchTerm))
          dispatch(setSearchCategory(selectedCategory))
          dispatch(setSearchData(data.items))
        }

        setResults(data.items)
        setNextPage(2)
      } catch (error) {
        setError((error as Error).message)
        setHasMoreResults(false)
      } finally {
        setLoading(false)
      }
    }
  }, [selectedCategory, searchTerm, dispatch])

  const debouncedSearch = useDebounce(search, delayInMs)

  const fetchMore = useCallback(async () => {
    try {
      if (isFetching || !hasMoreResults) {
        return
      }

      setError(null)
      setIsFetching(true)

      const options: APIOptions = {
        q: searchTerm,
        per_page: CARDS_PER_PAGE,
        page: nextPage,
      }
      const data = await searchGithub(selectedCategory, options)

      if (data.items.length === 0) {
        setHasMoreResults(false)
      } else {
        setResults([...results, ...data.items])
        setNextPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      setError((error as Error).message)
      setHasMoreResults(false)
    } finally {
      setIsFetching(false)
    }
  }, [selectedCategory, searchTerm, isFetching, hasMoreResults, nextPage, results])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    debouncedSearch()
  }

  const observerRef = useInfiniteScroll(fetchMore)

  return (
    <Layout style={{ paddingBottom: searchTerm.length < MIN_SEARCH_LENGTH ? 0 : 16 }}>
      <Search
        searchTerm={searchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleSearchChange={handleSearchChange}
      />
      {error && <Alert style={{ marginTop: 16 }} message={error} type="error" showIcon />}
      {loading ? (
        <Fragment>
          <Divider />
          <LoadingCards />
        </Fragment>
      ) : (
        searchTerm.length >= MIN_SEARCH_LENGTH && (
          <Fragment>
            <Divider />
            <CardList category={selectedCategory} cards={results} />
          </Fragment>
        )
      )}
      <div
        style={{
          display: searchTerm.length < MIN_SEARCH_LENGTH ? "none" : "block",
        }}
        ref={observerRef}
      />
      {isFetching && <LoadingCards />}
    </Layout>
  )
}

export default SearchContainer
