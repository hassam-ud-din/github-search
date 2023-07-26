import { Layout, Row, Col, Card, Skeleton } from "antd"
import { CARDS_PER_PAGE, LOADING_ACTIVE_PARAGRAPHS } from "../constants"

function LoadingCards() {
  return (
    <Layout style={{ marginTop: "16px" }}>
      <Row gutter={[16, 16]}>
        {[...Array(CARDS_PER_PAGE)]?.map((_, i) => (
          <Col xs={24} sm={12} md={8} lg={6} key={i}>
            <Card style={{ height: "auto" }}>
              <Skeleton
                loading={true}
                avatar
                active
                paragraph={{ rows: LOADING_ACTIVE_PARAGRAPHS }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default LoadingCards
