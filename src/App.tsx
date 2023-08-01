import SearchContainer from "./containers/SearchContainer"
import { Category } from "./shared/types"
import { Layout } from "antd"

function App() {
  const categories: Array<Category> = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  return (
    <Layout className="container">
      <SearchContainer categories={categories} />
    </Layout>
  )
}

export default App
