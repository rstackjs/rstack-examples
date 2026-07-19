// babel.config.js
const ReactCompilerConfig = {
  /* ... */
};

export default {
  plugins: [
    ['babel-plugin-react-compiler', ReactCompilerConfig], // must run first!
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-syntax-typescript', { isTSX: true }],
  ],
};
