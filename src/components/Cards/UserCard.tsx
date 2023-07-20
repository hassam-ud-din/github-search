import React from "react"
import { Space, Card } from "antd"
import { LinkOutlined } from "@ant-design/icons"

type Props = {
  id: number
  login: string
  url: string
  html_url: string
}

function UserCard({ id, url, html_url, login }: Props) {
  return (
    <Space direction="vertical">
      <Card
        title={login}
        extra={
          <a href={html_url}>
            <LinkOutlined />
          </a>
        }
        style={{ width: 300 }}
      >
        <p>{id}</p>
        <p>{url}</p>
      </Card>
    </Space>
  )
}

export default UserCard
