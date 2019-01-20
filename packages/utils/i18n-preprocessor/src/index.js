import path from 'path'

const filter = /src\/.*\.jsx?$/i
const src = /src\/.*$/

export default (contents, filePath) => {

  if(!filter.test(filePath)) {
    return ''
  }

  const groupName = path.parse(filePath.replace(src, '')).name

  return contents.replace(/i18n`/g, `i18n('${groupName}')\``)
}