import { Octokit } from "octokit"
import { APIOptions } from "../shared/types"
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: import.meta.env.GITHUB_ACCESS_TOKEN,
})

export const searchGithub = async (category: string, options: APIOptions) => {
  const response = await octokit.request(`GET /search/${category}`, options)
  return response.data
}
