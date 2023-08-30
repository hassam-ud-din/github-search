import React from 'react'
import * as lightTheme from '../ant-tokens/light.json'
import * as darkTheme from '../ant-tokens/dark.json'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from '../app/hooks'

type RootState = {
  theme: {
    darkMode: boolean
  }
}

type Props = {
  children: React.ReactNode
}

function ThemeProvider({ children }: Props) {
  const darkMode = useAppSelector((state: RootState) => state.theme.darkMode)
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
