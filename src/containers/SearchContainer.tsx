import React, { Fragment, useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import { octokit, searchGithub } from "../utils/searchGithub"
import CategoryFilter from "../components/Search/CategoryFilter"

type Props = {}

function SearchContainer({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debounceDelay: number = 1000 // in milliseconds

  // replace 'any' with a concrete type
  const [results, setResults] = useState<Array<any>>([])

  const categories = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].value
  )

  // callback function for useDebounce hook
  const search = async () => {
    if (searchTerm.length >= 3) {
      const options = {
        q: searchTerm,
        per_page: 8,
      }
      const data = await searchGithub(octokit, selectedCategory, options)
      console.log(`returned data for ${searchTerm}:`, data)
      setResults(data.items)
    }
  }

  useEffect(() => {
    search()
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
    <Fragment>
      <SearchField
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <CategoryFilter
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />
      <div>
        {searchTerm.length >= 3 &&
          results?.map((result) => <div key={result.id}>{result.url}</div>)}
      </div>
    </Fragment>
  )
}

export default SearchContainer
