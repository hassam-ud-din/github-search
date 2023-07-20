import { useState } from "react"
import SearchContainer from "../containers/SearchContainer"
import { useAppSelector } from "../app/hooks"
import CardsContainer from "../containers/CardsContainer"

type Props = {}

function Main({}: Props) {
  const categories = [
    { value: "users", label: "User" },
    { value: "repositories", label: "Repos" },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>(
    useAppSelector((state) => state.search.category) || categories[0]?.value
  )

  // replace 'any' with a concrete type
  const [results, setResults] = useState<Array<any>>(
    useAppSelector((state) => state.search.data)
  )

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
  }

  return (
    <main>
      <SearchContainer
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        results={results}
        setResults={setResults}
      />
      {results && <CardsContainer cards={results} category={selectedCategory} />}
    </main>
  )
}

export default Main
