### Features
* [i18n](https://github.com/skolmer/es2015-i18n-tag)
* [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
* Auto generate JSON Scheme
* Multiple language support 
* Babel
* Monorepo

### Example
```js
// packages/core/simple/src/index.js
const name = 'User'

console.log(
  i18n`Hello ${ name }`
)

console.log(
  i18n`Unknown ${ name }`
)
```

```js
// packages/core/sample/src/index.js

const name = 'User'

console.log(
  i18n`Hello ${ name }`
)
```

### Auto generate JSON Scheme
```sh
yarn i18n:generate
```

i18n/translation.schema.json
```json
{
  "type": "object",
  "properties": {
  "$schema": {
    "type": "string"
  },
  "packages/core/sample/src/index.js": {
    "type": "object",
    "properties": {
      "Hello ${0}": {
        "type": "string",
        "minLength": 1,
        "pattern": "(?=.*?\\$\\{0\\})"
      }
    },
    "required": [
    "Hello ${0}"
    ]
  },
  "packages/core/simple/src/index.js": {
    "type": "object",
    "properties": {
      "Hello ${0}": {
        "type": "string",
        "minLength": 1,
        "pattern": "(?=.*?\\$\\{0\\})"
      },
      "Unknown ${0}": {
        "type": "string",
        "minLength": 1,
        "pattern": "(?=.*?\\$\\{0\\})"
      }
    },
    "required": [
      "Hello ${0}",
      "Unknown ${0}"
    ]
  }
  },
  "required": [
  "packages/core/sample/src/index.js",
  "packages/core/simple/src/index.js"
  ],
  "additionalProperties": false
}
```

### Multiple language support
i18n/translations/en.json
```json
{
  "packages/core/simple/src/index.js": {
    "Hello ${0}": "Hello Simple ${0}",
    "Unknown ${0}": "Unknown Simple ${0}"
  },
  "packages/core/sample/src/index.js": {
    "Hello ${0}": "Hello Sample ${0}"
  }
}
``` 

i18n/translations/fr.json
```json
{
  "packages/core/simple/src/index.js": {
    "Hello ${0}": "Bonjour Simple ${0}",
    "Unknown ${0}": "Unknown Simple ${0}"
  },
  "packages/core/sample/src/index.js": {
    "Hello ${0}": "Bonjour Sample ${0}"
  }
}
``` 

### Static analysis and validation

Success:

```sh
yarn i18n:validate
```

```
 VALID 

 - en.json is valid and  100% TRANSLATED !
 - fr.json is valid and  100% TRANSLATED !

Done in 1.25s.
```

Failure:

```
 WARN  en.json is missing translation key "Hello ${0}" in ['packages/core/sample/src/index.js']
 ERR!  en.json has 1 missing translation; 67% translated.

 INVALID 

 - en.json has  1 MISSING  translation;  67% TRANSLATED .
error Command failed with exit code 1.
```

### Babel
```js
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

```