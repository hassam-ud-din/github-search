// data.items
//         .title
//         .properties.owner.anyOf[1].title
//         .stargazers_count
//         onClick => .url
import React from "react"
import { Col, Row, Divider } from "antd"
import UserCard from "./UserCard"
import RepoCard from "./RepoCard"
import { RepoType, UserType } from "../../types/api"

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
  loading: boolean
}

function CardList({ category, cards, loading }: Props) {
  const CardComponent = cardComponents[category]

  return (
    <div>
      <Divider></Divider>
      <Row>
        {cards?.length > 0 ? (
          cards?.map((card) => (
            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
              <CardComponent {...card} loading={loading} />
            </Col>
          ))
        ) : (
          <p>No data found</p>
        )}
      </Row>
    </div>
  )
}

export default CardList
