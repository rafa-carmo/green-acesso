import { existsSync, promises } from 'node:fs'

export async function createIfNotExsitsFolder(path: string) {
  if (existsSync(path)) {
    return
  }
  await promises.mkdir(path, { recursive: true })
}
