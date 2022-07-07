module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'selector-class-pattern': [
      '^([a-z0-9]+-)*([a-z0-9]+)(__([a-z0-9]+-)*([a-z0-9]+))?(--([a-z0-9]+-)*([a-z0-9]+))?$',
      { severity: 'warning' },
    ],
    'block-no-empty': [true, { severity: 'error' }],
    'comment-no-empty': [true, { severity: 'error' }],
    'no-duplicate-selectors': [true, { severity: 'warning' }],
    'color-function-notation': 'modern',
    'media-feature-name-no-unknown': 'off',
  },
};
