const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const modules = ['monolith-shared'];
const blacklisted = arrayFlatMap(modules, module => [
  new RegExp(`${module}/node_modules/react-native/.*`),
  new RegExp(`${module}/node_modules/react/.*`),
]);

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
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
    // these path won't enter Module Resolution tree
    blacklistRE: blacklist(blacklisted),
  },
  // this teaches Metro to look outside of the MobileApp tree
  watchFolders: modules.map(moduleName => path.join(__dirname, `../${moduleName}`))
};

// Backport of Array.flatMap.
function arrayFlatMap(a, f) {
  return [].concat(...a.map(f));
}
