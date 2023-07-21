import { Space } from "antd"
import { Card } from "antd"
import { LinkOutlined } from "@ant-design/icons"
import { RepoType } from "../../types/api"

function RepoCard(repo: RepoType) {
  return (
    <Space direction="vertical">
      <Card
        loading={repo.loading}
        title={repo.name}
        extra={
          <a href={repo.html_url}>
            <LinkOutlined />
          </a>
        }
        style={{ width: 300 }}
      >
        <p>{repo.id}</p>
        {/* <p>{repo.url}</p> */}
      </Card>
    </Space>
  )
}

export default RepoCard
