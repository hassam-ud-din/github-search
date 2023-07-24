import "./App.css"
import SearchContainer from "./containers/SearchContainer"
import { Layout } from "antd"
import ThemeProvider from "./containers/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <Layout className="container">
        <SearchContainer />
      </Layout>
    </ThemeProvider>
  )
}

export default App
