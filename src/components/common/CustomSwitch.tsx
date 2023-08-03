import { Switch } from "antd"

type Props = {
  id?: string
  checkedChildren?: string
  unCheckedChildren?: string
  checked: boolean
  handleChange: () => void
}

function CustomSwitch(props: Props) {
  return (
    <Switch
      id={props.id}
      checkedChildren={props.checkedChildren}
      unCheckedChildren={props.unCheckedChildren}
      checked={props.checked}
      onChange={props.handleChange}
    />
  )
}

export default CustomSwitch
