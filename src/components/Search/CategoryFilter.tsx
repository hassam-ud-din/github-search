import { Select } from "antd"

type Props = {
  selectedCategory: string
  categories: { value: string; label: string }[]
  handleCategoryChange: (newCategory: string) => void
}

function CategoryFilter({ selectedCategory, categories, handleCategoryChange }: Props) {
  const defaultValue = categories.find(
    (category) => category.value === selectedCategory
  )?.label

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
