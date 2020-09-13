import * as fs from 'fs'
import {PackageJSON, Packages} from './@types/type'

/**
 * load package.json
 */
async function loadPackageJson(packageJsonPath: string): Promise<PackageJSON> {
  const packageJson: PackageJSON = JSON.parse(
    await fs.readFileSync(packageJsonPath, 'utf8'),
  )
  return packageJson
}

/**
 * get packages from package.jsonのdependencies & devDependencies
 */
export async function listPackages(packageJsonPath: string) {
  const packageJson = await loadPackageJson(packageJsonPath)
  let packages: Packages = new Set<string>()

  const typePackage = new RegExp('^@types/', 'g')

  if (typeof packageJson.dependencies !== 'undefined') {
    for (const [packageName, _] of Object.entries(packageJson.dependencies)) {
      if (typePackage.test(packageName)) {
        continue
      }
      packages.add(packageName)
    }
  }

  if (typeof packageJson.devDependencies !== 'undefined') {
    for (const [packageName, _] of Object.entries(
      packageJson.devDependencies,
    )) {
      if (typePackage.test(packageName)) {
        continue
      }
      packages.add(packageName)
    }
  }

  return packages
}
