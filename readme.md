# Tesla Model S

This is the desktop version of a landing page of a hypothetical Tesla Model S website.

## Usage

```bash
# Install npm packages
npm install

# Start (serve)
npm start

# Run tests
npm run test

# Build
npm run build # for production
npm run build:dev # for development
```

## Used Libraries

- Typescript
- Jest + JSDom
- Selenium

### Bundler

- Webpack
- html-loader: PostHTML + posthtml-include + posthtml-inline-svg ([Why PostHTML?](./docs/use-posthtml-for-preprocessing-html-files.md))
- sass-loader + css-loader + postcss-loader

### Linters

- Prettier
- ESLint
- @typescript-eslint
- StyleLint

## Browser Support

- Dynamic polyfills by https://polyfill.io/
- Polyfill for `FormData` by [formdata-polyfill](https://www.npmjs.com/package/formdata-polyfill)
- PostCSS and [Browserslist](https://browserslist.dev/)

### IE11 Support

This project supports IE11 browser although [IE11 is used by less than 0.1% of users](https://browserslist.dev/).
In order to support this browser, I've used some [hacks](http://browserhacks.com/):

- `@media screen\0 {}` to apply styles only to IE11
- Provided an implementation for `HtmlInputElement.stepUp` and `HtmlInputElement.stepDown`

**Recommended Links**:

- https://web.dev/the-end-of-ie/
- Vue 3 ends support of IE 11: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md

## CI

The CI contains 4 stages:

- install: Installs NPM packages if needed and stores node_modules and npm cache.
- precheck: Runs all of the linters on merge requests
- build: Runs `npm run build`
- publish: Deploys the project on GitLab pages
