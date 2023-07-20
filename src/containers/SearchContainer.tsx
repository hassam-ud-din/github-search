import React, { useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import CategoryFilter from "../components/Search/CategoryFilter"
import { Space } from "antd"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setQuery, setSearchCategory, setSearchData } from "../features/search/searchSlice"
import { searchGithub } from "../services/api"

type Props = {
  categories: { value: string; label: string }[]
  selectedCategory: string
  results: Array<any>
  handleCategoryChange: (newCategory: string) => void
  setResults: any
}

function SearchContainer({
  results,
  categories,
  selectedCategory,
  handleCategoryChange,
  setResults,
}: Props) {
  const dispatch = useAppDispatch()

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
        per_page: 8,
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
    if (isComponentMounted) search()
  }, [selectedCategory])

  const debouncedSearch = useDebounce(search, debounceDelay)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  return (
    <Space wrap>
      <SearchField searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
    </Space>
  )
}

export default SearchContainer
