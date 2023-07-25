export type UserType = {
  loading: boolean
  id: number
  login: string
  html_url: string
  followers: number
  name: string
  public_repos: number
  location: string
  avatar_url: string
}

export type RepoType = {
  loading: boolean
  id: number
  name: string
  url: string
  html_url: string
}

export type APIOptions = {
  q: string
  sort?: "followers" | "repositories" | "joined"
  order?: "desc" | "asc"
  per_page?: number
  page?: number
}

export type CategoriesType = { value: string; label: string }[]
