import React, { useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import CategoryFilter from "../components/Search/CategoryFilter"
import { Space } from "antd"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setQuery, setSearchCategory, setSearchData } from "../features/search/searchSlice"
import { searchGithub } from "../services/api"
import CardList from "../components/Cards/CardList"

type Props = {}

function SearchContainer({}: Props) {
  const dispatch = useAppDispatch()

  const categories = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>(
    useAppSelector((state) => state.search.category)
  )

  // replace 'any' with a concrete type
  const [results, setResults] = useState<Array<any>>(
    useAppSelector((state) => state.search.data)
  )

  const [searchTerm, setSearchTerm] = useState<string>(
    useAppSelector((state) => state.search.query)
  )

  const [isComponentMounted, setIsComponentMounted] = useState(false)

  const debounceDelay: number = 1000 // in milliseconds

  // callback function for useDebounce hook
  const search = async () => {
    if (searchTerm.length >= 3) {
      const options = {
        q: searchTerm,
        per_page: 12,
      }
      const data = await searchGithub(selectedCategory, options)
      console.log("data", data)

      dispatch(setQuery(searchTerm))
      dispatch(setSearchCategory(selectedCategory))
      dispatch(setSearchData(data.items))

      setResults(data.items)
    }
  }

  useEffect(() => {
    // preventing the api call if have persisted state
    setIsComponentMounted(true)
    if (isComponentMounted) debouncedSearch()
  }, [selectedCategory])

  const debouncedSearch = useDebounce(search, debounceDelay)

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
      <CardList category={selectedCategory} cards={results} />
    </React.Fragment>
  )
}

export default SearchContainer
