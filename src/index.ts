import {Packages, RepositoryItem} from './@types/type'
import {listPackages} from './handlePackages'
import {searchRepository} from './search'
import {notNull} from './utils/utils'

async function getRepositoryItems(packages: Packages) {
  let repositoryItems: (RepositoryItem | null)[] = []
  for (let v of packages) {
    const repo = await searchRepository(v)
    repositoryItems.push(repo)
  }
  const nonNullablesRepositoryItems: RepositoryItem[] = repositoryItems.filter(
    notNull,
  )
  return nonNullablesRepositoryItems
}

async function main() {
  const packagePath = './package.json'
  const packages = await listPackages(packagePath)
  const repositoryItems = await getRepositoryItems(packages)
  console.log(repositoryItems)
}

main()
