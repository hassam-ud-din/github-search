import { Octokit } from "octokit"
import { APIOptions } from "../types/api"
// Octokit.js
// https://github.com/octokit/core.js#readme

export const searchGithub = async (category: string, options: APIOptions) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  })
  const response = await octokit.request(`GET /search/${category}`, options)
  return response.data
}
