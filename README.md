# babel-plugin-as-html

A plugin for Babel 6 that removes whitespace and minifies html written using [as-html](https://github.com/DylanPiercey/as-html) with es2015 template strings.

## Installation

```bash
$ npm install babel-plugin-as-html --save-dev
$ babel --plugins as-html script.js
```

## Example

All template strings tagged with the `html` tag will be minified and all unneeded white-space will be removed.

For instance the following tagged template:

```javascript
import html from 'as-html'
let output = html`
	<div>
		<section class="super-cool">Hello World!</section>
	</div>
`;
```

becomes:

```javascript
import html from 'as-html'
let output = html(['<div><section class="super-cool">Hello World!<\/section><\/div>'])
```

## Contributions

* Use `npm test` to run tests.

## License

[MIT](https://tldrlegal.com/license/mit-license)
