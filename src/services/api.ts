import { Octokit } from "octokit"
import { APIOptions } from "../shared/types"
// https://github.com/octokit/core.js#readme

export const searchGithub = async (category: string, options: APIOptions) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  })
  const response = await octokit.request(`GET /search/${category}`, options)
  return response.data
}
