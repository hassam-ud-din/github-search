import React from "react"
import { Input } from "antd"

type Props = {
  searchTerm: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchField({ searchTerm, handleSearchChange }: Props) {
  return (
    <Input
      type="text"
      placeholder="Start typing to search .."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  )
}

export default SearchField
