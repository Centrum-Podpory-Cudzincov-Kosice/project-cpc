module.exports = {
  input: ['src/components/**/*.{js,jsx,ts,tsx}'],

  output: 'src/utils/i18n/$LOCALE/$NAMESPACE.json',

  locales: ['en', 'sk', 'ua'],

  defaultNamespace: 'common',

  namespaceSeparator: ':',

  keySeparator: '.',

  createOldCatalogs: false,
}