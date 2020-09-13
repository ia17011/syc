import {getRepositoryItems} from '../src/githubClient'

describe('can fetch GitHub repositories', () => {
  test('can fetch all exist Packages', async () => {
    const packages = ['TypeScript, webpack, jest']
    const items = await getRepositoryItems(packages)
    expect(items.length).toBe(packages.length)
  })
})
