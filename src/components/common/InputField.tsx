import React from "react"
import { Input } from "antd"

type Props = {
  value: string
  placeholder?: string
  name?: string
  type: string
  handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField(props: Props) {
  return (
    <Input
      type={props.type}
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleValueChange}
    />
  )
}

export default InputField
