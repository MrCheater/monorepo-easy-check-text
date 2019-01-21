import path from 'path'

const filter = /src\/.*\.jsx?$/i

export default (contents, filePath) => {
  if(!filter.test(filePath)) {
    return ''
  }

  const groupName = (path.relative(
    path.join(__dirname, '..', '..', '..', '..'),
    filePath
  ))

  return contents.replace(/i18n`/g, `i18n(${JSON.stringify(groupName)})\``)
}