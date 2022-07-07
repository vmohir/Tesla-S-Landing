# Tesla Model S

[![Netlify Status](https://api.netlify.com/api/v1/badges/d83464cb-53e2-4820-972e-f7d0348a5f50/deploy-status)](https://app.netlify.com/sites/sendcloud-tesla-landing/deploys)

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
- Used JPG format for images instead of WebP
- Used TTF format for fonts instead of WOFF2
- `&::-ms-check` to hide checkbox and radio buttons

**Recommended Links**:

- https://web.dev/the-end-of-ie/
- Vue 3 ends support of IE 11: https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md

## CI

The CI contains 4 stages:

- install: Installs NPM packages if needed and stores node_modules and npm cache.
- precheck: Runs all of the linters on merge requests
- build: Runs `npm run build`
- publish: Deploys the project on GitLab pages

## To Do

- [x] dark mode
- [x] up/down for inputs
- [x] browserslist
- [x] polyfills
- [x] BEM
- [x] css accent colors
- [x] bottom 3d shadow for "AC on" button
- [x] skip to main accessibility
- [x] favicon
- [x] Prettier
- [x] stylelint
- [x] eslint
- [x] ac mode icon animation
- [x] no-js support
- [x] documentation in readme.md
- [x] document ADRs
- [x] end-to-end test
- [x] responsive menu
- [x] flex separator lines responsiveness
- [x] svg and image optimizations
- [x] netlify
- [x] Gitlab CI
- [x] car's wheel size animation
- [x] commitlint husky
- [x] open graph protocol
- [x] unit tests
- [ ] add the form values to url as query parameters
- [ ] error handling
- [ ] animation for incrementing and decrementing kilometer values
- [ ] support CSS reduced motion
- [ ] [focus on form after scroll down button](https://web.dev/building-a-sidenav-component/#focus-ux)
- [ ] loading indicator until JSON is loaded
