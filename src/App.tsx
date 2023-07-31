import SearchContainer from "./containers/SearchContainer"
import { CategoryType } from "./shared/types"
import { Layout } from "antd"

function App() {
  const categories: Array<CategoryType> = [
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
