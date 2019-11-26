const path = require('path');

const modules = ['monolith-shared'];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    // These are to help Metro find modules imported from files found
    // outside our tree.  Without it, Metro tries to resolve them from
    // the ancestor directories of those files and doesn't look in our
    // own node_modules.
    extraNodeModules: {
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
  // this teaches Metro to look outside of the MobileApp tree
  watchFolders: modules.map(moduleName => path.join(__dirname, `../${moduleName}`))
};
