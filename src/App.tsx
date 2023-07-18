import React from "react"
import { Space, Select } from "antd"
import "./App.css"
import SearchFieldContainer from "./containers/SearchFieldContainer"

function App() {
  return (
    <Space wrap>
      <SearchFieldContainer />
    </Space>
  )
}

export default App
