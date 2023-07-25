import { Skeleton, Card, Avatar } from "antd"
import { UserType } from "../../types/api"

const { Meta } = Card
function UserCard(user: UserType) {
  return (
    <a href={`${user.html_url}`} target="_blank" rel="noreferrer">
      <Card hoverable>
        <Skeleton loading={false} avatar active>
          <Meta avatar={<Avatar src={`${user.avatar_url}`} />} title={user.login} />
        </Skeleton>
      </Card>
    </a>
  )
}

export default UserCard
