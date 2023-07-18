import React, { useState } from "react"
import { Select } from "antd"

type Props = {
  handleCategoryChange: any
}

function CategoryFilter({ handleCategoryChange }: Props) {
  const defaultValue: any = "User"
  const categories = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120 }}
      onChange={handleCategoryChange}
      options={categories}
    />
  )
}

export default CategoryFilter
