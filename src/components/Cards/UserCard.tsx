import { Skeleton, Card, Avatar } from "antd"
import { UserType } from "../../types/api"

const { Meta } = Card
function UserCard(user: UserType) {
  const handleClick = () => {}

  return (
    <a href={`${user.html_url}`} target="_blank">
      <Card hoverable>
        <Skeleton loading={false} avatar active>
          <Meta avatar={<Avatar src={`${user.avatar_url}`} />} title={user.login} />
        </Skeleton>
      </Card>
    </a>
  )
}

export default UserCard
