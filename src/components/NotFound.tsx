import { Layout, Typography, Space } from "antd"
import React from "react"
import { Link } from "react-router-dom"

const { Text, Title } = Typography

function NotFound() {
  return (
    <Layout className="container">
      <Space className="center not-found" direction="vertical">
        <Title type="danger">404</Title>
        <Text>Page not found</Text>
        <Link to="/">Go to App</Link>
      </Space>
    </Layout>
  )
}

export default NotFound
