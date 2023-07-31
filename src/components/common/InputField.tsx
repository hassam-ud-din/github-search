import React from "react"
import { Input } from "antd"

type Props = {
  searchTerm: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField({ searchTerm, handleSearchChange }: Props) {
  return (
    <Input
      type="text"
      name="search"
      placeholder="Start typing to search .."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  )
}

export default InputField
