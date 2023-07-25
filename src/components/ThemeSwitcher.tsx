import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Switch } from "antd"
import { toggleTheme } from "../features/themeSlice"

type RootState = {
  theme: {
    darkMode: boolean
  }
}

function ThemeSwitcher() {
  const dispatch = useDispatch()
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const handleToggleTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <Switch
      id="darkModeToggle"
      checkedChildren="Dark"
      unCheckedChildren="Light"
      checked={darkMode}
      onChange={handleToggleTheme}
    />
  )
}

export default ThemeSwitcher
