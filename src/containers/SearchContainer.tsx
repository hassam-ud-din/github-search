import React, { useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import CategoryFilter from "../components/Search/CategoryFilter"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setQuery, setSearchCategory, setSearchData } from "../features/search/searchSlice"
import { searchGithub } from "../services/api"
import CardList from "../components/Cards/CardList"
import useInfiniteScroll, { UseInfiniteScrollResult } from "../hooks/useInfiniteScroll"
import { APIOptions, RepoType, UserType } from "../types/api"
import { CategoriesType } from "../types/api"

function SearchContainer() {
  const dispatch = useAppDispatch()
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const delayInMs: number = 1000
  const [nextPage, setNextPage] = useState<number>(2)
  const [loading, setLoading] = useState<boolean>(false)

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
    if (searchTerm.length >= 3) {
      try {
        setLoading(true)
        const options: APIOptions = {
          q: searchTerm,
        }
        const data = await searchGithub(selectedCategory, options)

        console.log("data", data)

        dispatch(setQuery(searchTerm))
        dispatch(setSearchCategory(selectedCategory))
        dispatch(setSearchData(data.items))

        setResults(data.items)
        setNextPage(2)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const debouncedSearch = useDebounce(search, delayInMs)

  const fetchMore = async () => {
    try {
      const options: APIOptions = {
        q: searchTerm,
        page: nextPage,
      }
      const data = await searchGithub(selectedCategory, options)
      //*** Optimise this by using use ref and not sending the request if state is not changed ***
      // if (data.items === results) return

      setResults([...results, ...data.items])
      setNextPage((prevPage) => prevPage + 1)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  const [isFetching, setIsFetching]: UseInfiniteScrollResult = useInfiniteScroll(fetchMore)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
  }

  return (
    <React.Fragment>
      <SearchField searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <CardList category={selectedCategory} cards={results} loading={loading} />
    </React.Fragment>
  )
}

export default SearchContainer
