import {Octokit} from '@octokit/rest'
import {RepositoryItem} from './@types/type'

const octokit = new Octokit()

/**
 * get single repository that hit with query(repositoryName)
 */
export async function searchRepository(repositoryName: string) {
  return octokit.search
    .repos({
      q: `${repositoryName} in:name`,
      order: 'desc',
    })
    .then((res) => {
      return res.data.items[0] as RepositoryItem
    })
    .catch(() => null)
}
