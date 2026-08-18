import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const indexPath = resolve('dist/index.html')
const serverEntryPath = resolve('dist-ssr/entry-server.js')
const rootMarker = '<div id="root"></div>'
const html = await readFile(indexPath, 'utf8')

if (!html.includes(rootMarker)) {
  throw new Error(`Unable to prerender: ${rootMarker} was not found in ${indexPath}`)
}

const { render } = await import(pathToFileURL(serverEntryPath).href)
const prerenderedHtml = html.replace(rootMarker, `<div id="root">${render()}</div>`)

await writeFile(indexPath, prerenderedHtml)
