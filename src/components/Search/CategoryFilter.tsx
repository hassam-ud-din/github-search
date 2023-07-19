import React, { useState } from "react"
import { Select } from "antd"

type Props = {
  categories: { value: string; label: string }[]
  handleCategoryChange: (newCategory: string) => void
}

function CategoryFilter({ categories, handleCategoryChange }: Props) {
  const defaultValue: any = "User"

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 80 }}
      onChange={handleCategoryChange}
      options={categories}
    />
  )
}

export default CategoryFilter
