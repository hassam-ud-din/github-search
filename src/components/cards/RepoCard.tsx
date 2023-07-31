import { Skeleton, Avatar, Row, Col, Typography } from "antd"
import { Card } from "antd"
import { RepoType } from "../../shared/types"
import { ForkOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { Fragment } from "react"

const { Meta } = Card
const { Text } = Typography

function RepoCard(repo: RepoType) {
  const descriptionContent = (
    <Fragment>
      <Row justify={"space-between"}>
        <Col>
          <ForkOutlined alt="forks count" />
        </Col>
        <Col>
          <EyeOutlined alt="watchers count" />
        </Col>
        <Col>
          <InfoCircleOutlined alt="issues count" />
        </Col>
      </Row>
      <Row justify={"space-between"}>
        <Col>
          <Text type="secondary">{repo?.forks}</Text>
        </Col>
        <Col>
          <Text type="secondary">{repo?.watchers}</Text>
        </Col>
        <Col>
          <Text type="secondary">{repo?.open_issues}</Text>
        </Col>
      </Row>
    </Fragment>
  )
  return (
    <a href={repo?.html_url} target="_blank" rel="noreferrer">
      <Card hoverable>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={repo?.owner?.avatar_url} />}
            title={repo?.name}
            description={descriptionContent}
          />
        </Skeleton>
      </Card>
    </a>
  )
}

export default RepoCard
