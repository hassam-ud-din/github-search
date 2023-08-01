export type User = {
  id: number
  login: string
  html_url: string
  avatar_url: string
}

export type Repo = {
  id: number
  name: string
  full_name: string
  url: string
  html_url: string
  forks: number
  open_issues: number
  description: string
  watchers: number
  created_at: string
  owner: User
}

export type APIData = User | Repo

export type APIOptions = {
  q: string
  sort?: "followers" | "repositories" | "joined"
  order?: "desc" | "asc"
  per_page?: number
  page?: number
}

export type Category = { value: string; label: string }
