import i18n from 'es2015-i18n-tag'

const name = 'User'

console.log(
	i18n`Hello ${ name }`
)

console.log(
	i18n`Unknown ${ name }`
)
