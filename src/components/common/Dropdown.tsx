import { Select } from "antd"
import { Category } from "../../shared/types"

type Props = {
  selected: string
  options: Array<Category>
  handleOptionChange: (newCategory: string) => void
  width?: string | number
}

function Dropdown({ selected, width, options, handleOptionChange }: Props) {
  const defaultValue = options.find((option) => option.value === selected)?.label

  return (
    <Select
      defaultValue={defaultValue ? defaultValue : options[0].label}
      style={{ width: width ? width : "6.25rem" }}
      onChange={handleOptionChange}
      options={options}
    />
  )
}

export default Dropdown
