import * as clc from 'cli-color'
import {RepositoryItem} from './@types/type'
import {getRepositoryItems} from './githubClient'
import {listPackages} from './handlePackages'

function showPackagesInfo(items: RepositoryItem[]) {
  for (const item of items) {
    const desc = item.description
    const sliceDesc = desc.length > 80 ? desc.slice(0, 80) + '…' : desc
    const updatedAt = new Date(item.updated_at).toLocaleString()

    console.log(`
    ${item.full_name}: ${clc.cyan.underline(item.html_url)}
        - Description: ${sliceDesc}
        - Stars: ${item.stargazers_count}
        - Issues: ${item.open_issues_count} 
        - UpdatedAt: ${updatedAt}`)
  }
}

async function main() {
  const packages = await listPackages('./package.json')
  if (typeof packages === 'undefined' || (packages && packages.length === 0)) {
    console.info('No packages')
    return
  }

  const repositoryItems = await getRepositoryItems(packages)
  showPackagesInfo(repositoryItems)
}

main()
