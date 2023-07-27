import { Select } from "antd"
import { CategoryType } from "../../shared/types"

type Props = {
  selectedCategory: string
  categories: Array<CategoryType>
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
