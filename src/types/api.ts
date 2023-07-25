export type UserType = {
  id: number
  login: string
  html_url: string
  avatar_url: string
}

export type RepoType = {
  id: number
  name: string
  full_name: string
  url: string
  html_url: string
  forks: number
  open_issues: number
  watchers: number
  created_at: string
  owner: UserType
}

export type APIOptions = {
  q: string
  sort?: "followers" | "repositories" | "joined"
  order?: "desc" | "asc"
  per_page?: number
  page?: number
}

export type CategoriesType = { value: string; label: string }[]
