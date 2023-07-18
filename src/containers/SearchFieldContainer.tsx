import React, { useEffect, useState } from "react"
import SearchField from "../components/SearchField"
import useDebounce from "../hooks/useDebounce"
import searchGithub from "../utils/searchGithub"

type Props = {}

function SearchFieldContainer({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debounceDelay: number = 2000 // in milliseconds
  const [results, setResults] = useState<Array<any>>([])
  const [searchOption, setSearchOption] = useState("users")

  // callback function for useDebounce hook
  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      const data = await searchGithub(searchOption, searchTerm)
      console.log(`returned data for ${searchTerm}:`, data)
      setResults(data.items)
    }
  }

  const debouncedSearch: any = useDebounce(handleSearch, debounceDelay)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    debouncedSearch()
  }

  return (
    <React.Fragment>
      <SearchField
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div>
        {results &&
          results.map((result) => <div key={result.id}>{result.login}</div>)}
      </div>
    </React.Fragment>
  )
}

export default SearchFieldContainer
