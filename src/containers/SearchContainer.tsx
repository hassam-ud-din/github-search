import React, { useEffect, useState } from "react"
import SearchField from "../components/Search/SearchField"
import useDebounce from "../hooks/useDebounce"
import searchGithub from "../utils/searchGithub"
import CategoryFilter from "../components/Search/CategoryFilter"

type Props = {}

function SearchContainer({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debounceDelay: number = 1000 // in milliseconds

  // replace 'any' with a concrete type
  const [results, setResults] = useState<Array<any>>([])

  // coupling here (find a better approach)
  const [searchCategory, setSearchCategory] = useState<string>("users")

  // callback function for useDebounce hook
  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      const data = await searchGithub(searchCategory, searchTerm)
      console.log(`returned data for ${searchTerm}:`, data)
      setResults(data.items)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [searchCategory])

  // replace 'any' with a concrete type
  const debouncedSearch: any = useDebounce(handleSearch, debounceDelay)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  // search categories
  const handleCategoryChange = (newCategory: string) => {
    setSearchCategory(newCategory)
  }

  return (
    <React.Fragment>
      <SearchField
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <CategoryFilter handleCategoryChange={handleCategoryChange} />
      <div>
        {searchTerm.length >= 3 &&
          results?.map((result) => <div key={result.id}>{result.url}</div>)}
      </div>
    </React.Fragment>
  )
}

export default SearchContainer
