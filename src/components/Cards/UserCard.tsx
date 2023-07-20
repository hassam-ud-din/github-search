import React from "react"

type Props = {
  id: number
  url: string
}

function UserCard({ id, url }: Props) {
  return (
    <div>
      <p>{id}</p>
      <p>{url}</p>
    </div>
  )
}

export default UserCard
