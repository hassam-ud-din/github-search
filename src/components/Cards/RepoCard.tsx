import { Skeleton, Avatar } from "antd"
import { Card } from "antd"
import { RepoType } from "../../types/api"

const { Meta } = Card

function RepoCard(repo: RepoType) {
  return (
    <Card>
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
          title={repo.name}
          description={`id: ${repo.id}`}
        />
      </Skeleton>
    </Card>
  )
}

export default RepoCard
