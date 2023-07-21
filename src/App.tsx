import "./App.css"
import SearchContainer from "./containers/SearchContainer"
import { ConfigProvider, theme } from "antd"
import ThemeProvider from "./containers/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <SearchContainer />
    </ThemeProvider>
  )
}

export default App
