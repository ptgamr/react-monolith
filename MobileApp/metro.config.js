const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const linkedPackages = ['@monolith/shared'];
const getPackagePath = packageName => path.dirname(require.resolve(`${packageName}/package.json`));

// We don't want these paths to enter Module Resolution tree
// Otherwise, ReactNative will complain about multiple React version
// if there is another version of React specified in any of the linkedPackages
const blacklisted = arrayFlatMap(linkedPackages, packageName => [
  new RegExp(`${getPackagePath(packageName)}/node_modules/react-native/.*`),
  new RegExp(`${getPackagePath(packageName)}/node_modules/react/.*`),
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
    blacklistRE: blacklist(blacklisted),
  },
  // this teaches Metro to look outside of the MobileApp tree
  watchFolders: linkedPackages.map(getPackagePath)
};

// Backport of Array.flatMap.
function arrayFlatMap(a, f) {
  return [].concat(...a.map(f));
}
