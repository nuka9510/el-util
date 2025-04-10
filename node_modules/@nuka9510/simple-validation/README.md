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

[license]: https://img.shields.io/npm/l/%40nuka9510%2Fsimple-validation
[license-url]: https://github.com/nuka9510/simple-validation/blob/main/LICENSE

[github-version]: https://img.shields.io/github/package-json/v/nuka9510/simple-validation?logo=github
[github-version-url]: https://github.com/nuka9510/simple-validation

[npm-version]: https://img.shields.io/npm/v/%40nuka9510%2Fsimple-validation?logo=npm
[npm-version-url]: https://www.npmjs.com/package/@nuka9510/simple-validation

[github-last-commit]: https://img.shields.io/github/last-commit/nuka9510/simple-validation?logo=github

[npm-last-update]: https://img.shields.io/npm/last-update/%40nuka9510%2Fsimple-validation?logo=npm

[github-repo-size]: https://img.shields.io/github/repo-size/nuka9510/simple-validation?logo=github

[npm-unpacked-size]: https://img.shields.io/npm/unpacked-size/%40nuka9510%2Fsimple-validation?logo=npm

[jsdelivr-download]: https://img.shields.io/jsdelivr/npm/hm/%40nuka9510/simple-validation?logo=jsdelivr

[npm-download]: https://img.shields.io/npm/dm/%40nuka9510%2Fsimple-validation?logo=npm

[top-language]: https://img.shields.io/github/languages/top/nuka9510/simple-validation

# simple-validation
## Installation
```
npm i @nuka9510/simple-validation
```
## Usage
### js (> 1.1.0)
#### cdn
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.min.js"> </script>
```
or
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@latest/dist/index.min.js"> </script>
```
or
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@<specific-version>/dist/index.min.js"> </script>
```
### module
#### npm
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "<path>/node_modules/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-validation": "<path>/node_modules/@nuka9510/simple-validation/dist/index.mjs"
    }
  }
</script>
```
#### cdn
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.mjs"
    }
  }
</script>
```
or
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@latest/dist/index.mjs",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@latest/dist/index.mjs"
    }
  }
</script>
```
or
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@<specific-version>/dist/index.mjs",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation@<specific-version>/dist/index.mjs"
    }
  }
</script>
```
### example
```
example
├── js
│  └── index.mjs
└── view
   └── index.html
```
* example/js/index.mjs
```
import { SValidation } from "@nuka9510/simple-validation";

class Index {
  constructor() {
    this.onValidationCheckClick = this.onValidationCheckClick.bind(this);

    this.init();
  }

  init() {
    document.querySelectorAll('[data-action="validation-check-click"]').forEach((...arg) => { arg[0].addEventListener('click', this.onValidationCheckClick); });
  }

  onValidationCheckClick(ev) {
    const validation = new SValidation({ regex: { test: /^test/ } }),
    result = document.querySelector('[data-name="result"]');

    validation.run(form);

    console.log(validation.result);

    result.innerHTML = JSON.stringify(validation.result);
  }

}

new Index();
```
* example/view/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form name="form">
    <input type="text" name="test" data-sv-pattern="test" required="test">
    <button type="button" data-action="validation-check-click">validation-check</button>
  </form>
  <div data-name="result"></div>
</body>
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.mjs",
      "@nuka9510/simple-validation": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-validation/dist/index.mjs"
    }
  }
</script>
<script type="module" src="../js/index.mjs"></script>
</html>
```