import React from "react"
import { useSelector } from "react-redux"
import * as lightTheme from "../ant-tokens/light.json"
import * as darkTheme from "../ant-tokens/dark.json"
import { ConfigProvider, theme } from "antd"

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
  const token = darkMode ? darkTheme : lightTheme

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
