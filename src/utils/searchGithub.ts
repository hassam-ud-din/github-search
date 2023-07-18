import { Octokit } from "octokit"

const searchGithub = async (option: string, searchTerm: string) => {
  // Octokit.js
  // https://github.com/octokit/core.js#readme

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  })

  const response = await octokit.request(`GET /search/${option}`, {
    q: searchTerm,
    per_page: 2,
  })

  return response.data
}

export default searchGithub
