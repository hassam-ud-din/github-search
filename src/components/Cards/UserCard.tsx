import { Space, Card } from "antd"
import { LinkOutlined } from "@ant-design/icons"
import { UserType } from "../../types/api"

function UserCard(user: UserType) {
  return (
    <Space direction="vertical">
      <Card
        loading={user.loading}
        title={user.login}
        extra={
          <a href={user.html_url}>
            <LinkOutlined />
          </a>
        }
        style={{ width: 300 }}
      >
        <p>{user.id}</p>
        <p>{user.url}</p>
      </Card>
    </Space>
  )
}

export default UserCard
