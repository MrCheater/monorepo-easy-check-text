const path = require('path')

module.exports = (api) => {
	api.cache.forever()

	return {
		presets: [
			'@babel/preset-env',
			'@babel/preset-react'
		],
		plugins: [
			['babel-plugin-i18n-tag-translate', {
				translation: path.join(__dirname, 'i18n/translations/en.json'),
				globalImport: true,
				groupDir: __dirname
			}]
		]
	}
}
