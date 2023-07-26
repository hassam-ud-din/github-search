import { useSelector } from "react-redux"
import { Avatar } from "antd"
import GithubLogoBlack from "../../assets/images/github-mark.svg"
import GithubLogoWhite from "../../assets/images/github-mark-white.svg"

type RootState = {
  theme: {
    darkMode: boolean
  }
}

function GithubLogo() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  if (darkMode) {
    return <Avatar size={48} src={GithubLogoWhite} />
  }

  return <Avatar size={48} src={GithubLogoBlack} />
}

export default GithubLogo
