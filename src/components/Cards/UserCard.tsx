import { Skeleton, Card, Avatar } from "antd"
import { UserType } from "../../types/api"

const { Meta } = Card
function UserCard(user: UserType) {
  const handleClick = () => {}

  return (
    <a href={`${user.html_url}`} target="_blank">
      <Card hoverable>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
            title={user.login}
            description={`id: ${user.id}`}
          />
        </Skeleton>
      </Card>
    </a>
  )
}

export default UserCard
