import { Avatar } from "antd"
import { useAppSelector } from "../../app/hooks"

type RootState = {
  theme: {
    darkMode: boolean
  }
}

type Props = {
  DarkModeLogo: string
  LightModeLogo: string
  size: number
}

function CustomLogo({ DarkModeLogo, LightModeLogo, size }: Props) {
  const darkMode = useAppSelector((state: RootState) => state.theme.darkMode)

  if (darkMode) {
    return <Avatar size={size} src={DarkModeLogo} />
  }

  return <Avatar size={size} src={LightModeLogo} />
}

export default CustomLogo
