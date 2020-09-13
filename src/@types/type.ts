/**
 * package.json
 */
export type PackageJSON = {
  name?: string
  version?: string
  description?: string
  keywords?: string[]
  homepage?: string
  bugs?: string | PackageJSON.Bugs
  license?: string
  author?: string | PackageJSON.Author
  contributors?: string[] | PackageJSON.Author[]
  files?: string[]
  main?: string
  bin?: string | PackageJSON.BinMap
  man?: string | string[]
  directories?: PackageJSON.Directories
  repository?: string | PackageJSON.Repository
  scripts?: PackageJSON.ScriptsMap
  config?: PackageJSON.Config
  dependencies?: PackageJSON.DependencyMap
  devDependencies?: PackageJSON.DependencyMap
  peerDependencies?: PackageJSON.DependencyMap
  optionalDependencies?: PackageJSON.DependencyMap
  bundledDependencies?: string[]
  engines?: PackageJSON.Engines
  os?: string[]
  cpu?: string[]
  preferGlobal?: boolean
  private?: boolean
  publishConfig?: PackageJSON.PublishConfig
  typings?: string
  jest?: object
}

export namespace PackageJSON {
  export type Author = {
    name: string
    email?: string
    homepage?: string
  }
  export type BinMap = {
    [commandName: string]: string
  }
  export type Bugs = {
    email: string
    url: string
  }
  export type Config = {
    name?: string
    config?: Object
  }
  export type DependencyMap = {
    [dependencyName: string]: string
  }
  export type Directories = {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
  }
  export type Engines = {
    node?: string
    npm?: string
  }
  export type PublishConfig = {
    registry?: string
  }
  export type Repository = {
    type: string
    url: string
  }
  export type ScriptsMap = {
    [scriptName: string]: string
  }
}

type Package = string
export type Packages = Package[]

/**
 * GitHub repository item
 */
export type RepositoryItem = {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    received_events_url: string
    type: string
  }
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  forks_count: number
  open_issues_count: number
  master_branch: string
  default_branch: string
  score: number
}
