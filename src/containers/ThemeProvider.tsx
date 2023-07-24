import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { darkThemeToken, lightThemeToken } from "../assets/styles/themes"
import { ConfigProvider } from "antd"

/* DEFAULT LIGHT/DARK THEME BY ANTD
import { theme } from "antd"
const { darkAlgorithm, defaultAlgorithm } = theme
const algorithm = darkMode ? darkAlgorithm : defaultAlgorithm 
*/

type RootState = {
  theme: {
    darkMode: boolean
  }
}

type Props = {
  children: React.ReactNode
}

function ThemeProvider({ children }: Props) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  // custom tokens for dark and light mode
  const token = darkMode ? darkThemeToken : lightThemeToken

  useEffect(() => {
    // Set the background color of the body element based on the theme
    if (darkMode) {
      document.body.style.backgroundColor = token.colorBgBase
    } else {
      document.body.style.backgroundColor = "#fff"
    }
  }, [darkMode, token])

  return (
    <ConfigProvider
      theme={{
        token,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
