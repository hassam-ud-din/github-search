// ThemeProvider.tsx
import React from "react"
import { useSelector } from "react-redux"
import { lightTheme, darkTheme } from "../assets/styles/themes"
import { ConfigProvider } from "antd"

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

  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: theme.colorBgBase,
          colorText: theme.colorText,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
