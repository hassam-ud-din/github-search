import React, { Fragment, useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import CategoryFilter from "../components/Search/CategoryFilter"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setQuery, setSearchCategory, setSearchData } from "../features/searchSlice"
import { searchGithub } from "../services/api"
import CardList from "../components/Cards/CardList"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import { APIOptions, RepoType, UserType } from "../types/api"
import { CategoriesType } from "../types/api"
import ThemeSwitcher from "../components/ThemeSwitcher"
import { Row, Col, Space, Divider } from "antd"
import GithubLogo from "../components/GithubLogo"
import PageTitle from "../components/PageTitle"
import LoadingCards from "../components/Cards/LoadingCards"
import { CARDS_PER_PAGE, MIN_SEARCH_LENGTH } from "../constants"

function SearchContainer() {
  const dispatch = useAppDispatch()
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const delayInMs: number = 1000
  const [nextPage, setNextPage] = useState<number>(2)
  const [loading, setLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(true)

  const categories: CategoriesType = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>(
    useAppSelector((state) => state.search.category) || categories[0].value
  )

  const [results, setResults] = useState<Array<UserType | RepoType>>(
    useAppSelector((state) => state.search.data)
  )

  const [searchTerm, setSearchTerm] = useState<string>(
    useAppSelector((state) => state.search.query)
  )

  useEffect(() => {
    // prevent the api call if have persisted state
    setIsComponentMounted(true)
    if (isComponentMounted) debouncedSearch()
  }, [selectedCategory])

  // callback function for useDebounce hook
  const search = async () => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      try {
        setLoading(true)

        const options: APIOptions = {
          q: searchTerm,
          per_page: CARDS_PER_PAGE,
        }
        const data = await searchGithub(selectedCategory, options)

        dispatch(setQuery(searchTerm))
        dispatch(setSearchCategory(selectedCategory))
        dispatch(setSearchData(data.items))

        setLoading(false)
        setResults(data.items)
        setNextPage(2)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const debouncedSearch = useDebounce(search, delayInMs)

  const fetchMore = async () => {
    try {
      if (isFetching || !hasMoreResults) {
        return
      }

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
        setResults((prevResults) => [...prevResults, ...data.items])
        setNextPage((prevPage) => prevPage + 1)
      }

      setIsFetching(false)
    } catch (error) {
      console.log(error)
      setIsFetching(false)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
  }

  const observerRef = useInfiniteScroll(fetchMore)

  return (
    <Fragment>
      <Space
        direction="vertical"
        className={`width400 ${searchTerm.length < MIN_SEARCH_LENGTH ? "center" : ""}`}
      >
        <Row gutter={[16, 16]} align={"middle"}>
          <Col>
            <GithubLogo />
          </Col>
          <Col flex="auto">
            <PageTitle />
          </Col>
          <Col>
            <ThemeSwitcher />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <SearchField searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
          </Col>
          <Col>
            <CategoryFilter
              selectedCategory={selectedCategory}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
            />
          </Col>
        </Row>
      </Space>

      {loading ? (
        <Fragment>
          <Divider />
          <LoadingCards />
        </Fragment>
      ) : (
        searchTerm.length >= MIN_SEARCH_LENGTH && (
          <Fragment>
            <Divider />
            <CardList category={selectedCategory} cards={results} loading={loading} />
          </Fragment>
        )
      )}
      <div
        style={{ display: searchTerm.length < MIN_SEARCH_LENGTH ? "none" : "block" }}
        ref={observerRef}
      />
      {isFetching && <LoadingCards />}
    </Fragment>
  )
}

export default SearchContainer
