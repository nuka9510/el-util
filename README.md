[![LICENSE][license]][license-url]
[![GITHUB-VERSION][github-version]][github-version-url]
[![NPM-VERSION][npm-version]][npm-version-url]
![GITHUB-LAST-COMMIT][github-last-commit]
![NPM-LAST-UPDATE][npm-last-update]
![GITHUB-REPO-SIZE][github-repo-size]
![NPM-UNPACKED-SIZE][npm-unpacked-size]
![JSDELIVR-DOWNLOAD][jsdelivr-download]
![NPM-DOWNLOAD][npm-download]
![TOP-LANGUAGE][top-language]

[license]: https://img.shields.io/npm/l/%40nuka9510%2Fel-util
[license-url]: https://github.com/nuka9510/el-util/blob/main/LICENSE

[github-version]: https://img.shields.io/github/package-json/v/nuka9510/el-util?logo=github
[github-version-url]: https://github.com/nuka9510/el-util

[npm-version]: https://img.shields.io/npm/v/%40nuka9510%2Fel-util?logo=npm
[npm-version-url]: https://www.npmjs.com/package/@nuka9510/el-util

[github-last-commit]: https://img.shields.io/github/last-commit/nuka9510/el-util?logo=github

[npm-last-update]: https://img.shields.io/npm/last-update/%40nuka9510%2Fel-util?logo=npm

[github-repo-size]: https://img.shields.io/github/repo-size/nuka9510/el-util?logo=github

[npm-unpacked-size]: https://img.shields.io/npm/unpacked-size/%40nuka9510%2Fel-util?logo=npm

[jsdelivr-download]: https://img.shields.io/jsdelivr/npm/hm/%40nuka9510/el-util?logo=jsdelivr

[npm-download]: https://img.shields.io/npm/dm/%40nuka9510%2Fel-util?logo=npm

[top-language]: https://img.shields.io/github/languages/top/nuka9510/el-util

# el-util
## Installation
```
npm i @nuka9510/el-util
```
## Usage
### npm
```
  {
    "imports": {
      "@nuka9510/js-util": "<path>/node_modules/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-validation": "<path>/node_modules/@nuka9510/simple-validation/dist/index.js",
      "@nuka9510/el-util": "<path>/node_modules/@nuka9510/el-util/dist/index.js"
    }
  }
```
### cdn
```
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.js",
      "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util/dist/index.js"
    }
  }
```
or
```
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@latest/dist/index.js",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@latest/dist/index.js",
      "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util@latest/dist/index.js"
    }
  }
```
or
```
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@<specific-version>/dist/index.js",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@<specific-version>/dist/index.js",
      "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util@<specific-version>/dist/index.js"
    }
  }
```
### example
```
example
├── js
│  └── index.js
└── view
   └── index.html
```
- `js/index.js`
```
import { EUCommon } from "@nuka9510/el-util";

class Index extends EUCommon {
  get action() {
    return {
      'test-click': [
        { event: 'click', callback: this.onTestClick }
      ]
    };
  }

  constructor() {
    super();
    
    this.init();
  }

  onTestClick(ev) { alert('test'); }

}

new Index();
```
- `view/index.html`
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button type="button" data-eu-action="test-click">test-click</button>
</body>
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.js",
      "@nuka9510/el-util": "https://cdn.jsdelivr.net/npm/@nuka9510/el-util/dist/index.js"
    }
  }
</script>
<script src="../js/index.js" type="module"></script>
</html>
```