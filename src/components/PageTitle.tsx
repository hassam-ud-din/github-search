import React from "react"
import { Typography } from "antd"

const { Title, Text } = Typography

function PageTitle() {
  return (
    <React.Fragment>
      <Title level={4} style={{ marginBottom: "0", marginBlockStart: "0" }}>
        Github Searcher
      </Title>
      <Text type="secondary">Search users or repositories below</Text>
    </React.Fragment>
  )
}

export default PageTitle
