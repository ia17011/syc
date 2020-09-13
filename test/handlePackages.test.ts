import {listPackages} from '../src/handlePackages'

describe('handling package.json', () => {
  test('cannot find package.json', async () => {
    const res = await listPackages('./PACKAGE.JSON')
    expect(res).toBeInstanceOf('undefined')
  })
})
