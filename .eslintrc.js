module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', './projects/*/tsconfig.json'],
    createDefaultProgram: false,
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
};
