import * as fs from 'fs'
import {PackageJSON, Packages} from './@types/type'
import ora = require('ora')

/**
 * load package.json
 */
async function loadPackageJson(packageJsonPath: string) {
  try {
    const packageJson: PackageJSON = JSON.parse(
      await fs.readFileSync(packageJsonPath, 'utf8'),
    )
    return packageJson
  } catch (err) {
    console.error('could not load package.json', err.message)
  }
}

/**
 * get packages from package.jsonのdependencies & devDependencies
 */
export async function listPackages(packageJsonPath: string) {
  const spinner = ora('Loading package.json…').start()
  const packageJson = await loadPackageJson(packageJsonPath)
  if (typeof packageJson === 'undefined') {
    return
  }
  const packageSet = new Set<string>()

  // remove @types package
  const typePackage = new RegExp('^@types/', 'g')

  if (typeof packageJson.dependencies !== 'undefined') {
    for (const [pkgName, _] of Object.entries(packageJson.dependencies)) {
      if (typePackage.test(pkgName)) {
        continue
      }
      packageSet.add(pkgName)
    }
  }

  if (typeof packageJson.devDependencies !== 'undefined') {
    for (const [pkgName, _] of Object.entries(packageJson.devDependencies)) {
      if (typePackage.test(pkgName)) {
        continue
      }
      packageSet.add(pkgName)
    }
  }

  const packages: Packages = Array.from(packageSet)
  spinner.stop()

  return packages
}
