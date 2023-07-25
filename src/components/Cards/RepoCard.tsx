import { Skeleton, Avatar } from "antd"
import { Card } from "antd"
import { RepoType } from "../../types/api"

const { Meta } = Card

function RepoCard(repo: RepoType) {
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer">
      <Card>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={repo?.owner?.avatar_url} />}
            title={repo.full_name}
            description={repo.open_issues + repo.watchers + repo.forks}
          />
        </Skeleton>
      </Card>
    </a>
  )
}

export default RepoCard
