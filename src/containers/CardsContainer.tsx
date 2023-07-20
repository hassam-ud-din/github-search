// data.items
//         .title
//         .properties.owner.anyOf[1].title
//         .stargazers_count
//         onClick => .url
import React from "react"
import UserCard from "../components/Cards/UserCard"
import RepoCard from "../components/Cards/RepoCard"

type CardComponentMap = {
  [category: string]: React.ComponentType<any>
}

const cardComponents: CardComponentMap = {
  user: UserCard,
  repository: RepoCard,
}

type Props = {
  category: string
  cards: Array<any>
}

function CardsContainer({ category, cards }: Props) {
  const CardComponent = cardComponents[category]
  return (
    <div>
      {/* {cards.map((card) => {
        return <CardComponent key={card.id} {...card} />
      })} */}
      <div>
        {cards?.map((card) => (
          <div key={card.id}>{card.url}</div>
        ))}
      </div>
    </div>
  )
}

export default CardsContainer
