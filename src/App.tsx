import "./App.css"
import SearchContainer from "./containers/SearchContainer"
import ThemeProvider from "./containers/ThemeProvider"
import { CategoriesType } from "./types/api"
import { Layout } from "antd"

function App() {
  const categories: CategoriesType = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  return (
    <ThemeProvider>
      <Layout className="container">
        <SearchContainer categories={categories} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
