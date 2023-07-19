import React, { useState } from "react"
import { Select } from "antd"

type Props = {
  categories: { value: string; label: string }[]
  handleCategoryChange: (newCategory: string) => void
}

function CategoryFilter({ categories, handleCategoryChange }: Props) {
  const defaultValue: string | null | undefined = categories[0].value

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 100 }}
      onChange={handleCategoryChange}
      options={categories}
    />
  )
}

export default CategoryFilter
