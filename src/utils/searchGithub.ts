import { Octokit } from "octokit"
// Octokit.js
// https://github.com/octokit/core.js#readme

export const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

type OptionParams = {
  q: string
  sort?: "followers" | "repositories" | "joined"
  order?: "desc" | "asc"
  per_page?: number
  page?: number
}

export const searchGithub = async (
  octokit: Octokit,
  category: string,
  options: OptionParams
) => {
  const response = await octokit.request(`GET /search/${category}`, options)
  return response.data
}
