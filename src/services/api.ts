import { Octokit } from "octokit"
import { APIOptions } from "../types/api"
// https://github.com/octokit/core.js#readme

export const searchGithub = async (category: string, options: APIOptions) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  })
  const response = await octokit.request(`GET /search/${category}`, options)
  return response.data

  // if (items.length === 0) {
  //   return []
  // }

  // // a comma-seperated list of usernames or repo names
  // const names = items.map((item: any) => item.login || item.name).join(",")

  // const additionalInfoResponse = await octokit.request(`GET ${category}`, {
  //   login: names,
  // })

  // // Fetch additional information for each user
  // const dataWithAdditionalInfo = items.map((item: any) => {
  //   const additionalInfo = additionalInfoResponse.data.find(
  //     (info: any) => info.login === item.login || info.name === item.name
  //   )
  //   return { ...additionalInfo }
  // })

  // return items
}
