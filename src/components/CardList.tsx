import React from "react"
import { Layout, Col, Row } from "antd"
import UserCard from "./Cards/UserCard"
import RepoCard from "./Cards/RepoCard"
import { RepoType, UserType } from "../types/api"

type CardComponentMap = {
  [category: string]: React.ComponentType<any>
}

const cardComponents: CardComponentMap = {
  users: UserCard,
  repositories: RepoCard,
}

type Props = {
  category: string
  cards: Array<UserType | RepoType>
}

function CardList({ category, cards }: Props) {
  const CardComponent = cardComponents[category]

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        {cards?.length > 0 &&
          cards?.map((card) => (
            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
              <CardComponent {...card} />
            </Col>
          ))}
      </Row>
    </Layout>
  )
}

export default CardList
