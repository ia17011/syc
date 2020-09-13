import {Octokit} from '@octokit/rest'
import {Packages, RepositoryItem} from './@types/type'
import ora = require('ora')

/**
 * get single repository that hit with query(repositoryName)
 */
// async function fetchGitHubRepository(repositoryName: string) {
//   const octokit = new Octokit()
//   return octokit.search
//     .repos({
//       q: `${repositoryName} in:name`,
//       order: 'desc',
//     })
//     .then((res) => {
//       return res.data.items[0] as RepositoryItem
//     })
//     .catch(() => null)
// }

async function fetchGitHubRepositories(repositoryNames: string[]) {
  const octokit = new Octokit()
  let repos: RepositoryItem[] = []

  for (const name of repositoryNames) {
    octokit.search
      .repos({
        q: `${name} in:name`,
        order: 'desc',
      })
      .then((res) => {
        repos.push(res.data.items[0] as RepositoryItem)
      })
      .catch(() => null)
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
