import {Octokit} from '@octokit/rest'
import {Packages, RepositoryItem} from './@types/type'
import ora = require('ora')
require('dotenv').config()

async function fetchGitHubRepositories(packages: string[]) {
  const octokit = new Octokit()
  let repos: RepositoryItem[] = []

  for (const name of packages) {
    octokit.search
      .repos({
        q: `${name} in:name`,
        order: 'desc',
      })
      .then((res) => {
        repos.push(res.data.items[0] as RepositoryItem)
      })
  }

  return repos
}

export async function getRepositoryItems(
  packages: Packages,
): Promise<RepositoryItem[]> {
  const spinner = ora('Searching package repository on GitHub…').start()

  let repositoryItems: RepositoryItem[] = await fetchGitHubRepositories(
    packages,
  )
  spinner.stop()

  return repositoryItems
}
