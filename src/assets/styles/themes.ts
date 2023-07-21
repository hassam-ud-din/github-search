interface Theme {
  colorBgBase: string
  colorText: string
}

const lightTheme: Theme = {
  colorBgBase: "#f0f0f0",
  colorText: "#333",
}

const darkTheme: Theme = {
  colorBgBase: "#1a1a1a",
  colorText: "#fff",
}

export { lightTheme, darkTheme }
