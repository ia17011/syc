import * as clc from 'cli-color'
import * as ora from 'ora'
import {Packages, RepositoryItem} from './@types/type'
import {searchRepository} from './githubClient'
import {listPackages} from './handlePackages'
import {notNull} from './utils/utils'

async function getRepositoryItems(packages: Packages) {
  const spinner = ora('Searching package repository on GitHub…').start()

  let repositoryItems: (RepositoryItem | null)[] = []
  for (const pkg of packages) {
    const repo = await searchRepository(pkg)
    repositoryItems.push(repo)
  }
  const nonNullablesRepositoryItems: RepositoryItem[] = repositoryItems.filter(
    notNull,
  )

  spinner.stop()

  return nonNullablesRepositoryItems
}

async function main() {
  const packagePath = './package.json'
  const log = console.log

  const packages = await listPackages(packagePath)

  const repositoryItems = await getRepositoryItems(packages)

  for (let item of repositoryItems) {
    const desc = item.description
    const sliceDesc = desc.length > 80 ? desc.slice(0, 80) + '…' : desc

    log(`
    ${item.full_name}: ${clc.cyan.underline(item.html_url)}
        - Description: ${sliceDesc}
        - Stars: ${item.stargazers_count}
        - Issues: ${item.open_issues_count} 
        - UpdatedAt: ${item.updated_at}`)
  }
}

main()
