import { Select } from "antd"
import { CategoriesType } from "../../types/api"

type Props = {
  selectedCategory: string
  categories: CategoriesType
  handleCategoryChange: (newCategory: string) => void
}

function Dropdown({ selectedCategory, categories, handleCategoryChange }: Props) {
  const defaultValue = categories.find(
    (category) => category.value === selectedCategory
  )?.label

  return (
    <Select
      defaultValue={defaultValue ? defaultValue : categories[0].label}
      style={{ width: 100 }}
      onChange={handleCategoryChange}
      options={categories}
    />
  )
}

export default Dropdown
