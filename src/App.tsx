import "./App.css"
import { token } from "./assets/styles/theme"
import SearchContainer from "./containers/SearchContainer"
import { ConfigProvider } from "antd"

function App() {
  return (
    <ConfigProvider theme={{ token: token }}>
      <SearchContainer />
    </ConfigProvider>
  )
}

export default App
