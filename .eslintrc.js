module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    '@kakao/styleguide/comment',
    '@kakao/styleguide/es3',
    '@kakao/styleguide/es2015',
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
};
