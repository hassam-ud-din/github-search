import { Skeleton, Card, Avatar, Space, Typography } from "antd"
import { UserType } from "../../types/api"
import { Fragment } from "react"
import { NumberOutlined } from "@ant-design/icons"

const { Meta } = Card
const { Text } = Typography

function UserCard(user: UserType) {
  const descriptionContent = (
    <Fragment>
      <Space>
        <NumberOutlined alt="user id" />
        <Text type="secondary">{user?.id}</Text>
      </Space>
    </Fragment>
  )

  return (
    <a href={`${user.html_url}`} target="_blank" rel="noreferrer">
      <Card hoverable>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={`${user.avatar_url}`} />}
            title={user.login}
            description={descriptionContent}
          />
        </Skeleton>
      </Card>
    </a>
  )
}

export default UserCard
