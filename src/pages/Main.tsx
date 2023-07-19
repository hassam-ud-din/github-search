import SearchContainer from "../containers/SearchContainer"

import { Space } from "antd"

type Props = {}

function Main({}: Props) {
  return (
    <main>
      <Space wrap>
        <SearchContainer />
      </Space>
    </main>
  )
}

export default Main
