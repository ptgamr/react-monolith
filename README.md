This repo demonstrate how you can share code between React Web project & React Native project

## Problems

We have the following project structure:

```
react-monolith
  MobileApp/
    App.tsx
    package.json
  monolith-shared/
    lib/
    package.json
```

In the `MobileApp`, we want to reference some code from `monolith-shared`.

## Approaches

### use `npm link` or `yarn link`

It seems not straightforward, see the very first issue of Metro: https://github.com/facebook/metro/issues/1 

It doesn't support symlink, which is what `yarn link` does, it creates a symlink inside the `node_modules`

### Tweak `metro.config.js`

- `watchFolders`
- `extraNodeModules`
- `blacklistRE`

This approach seems to work fine, the only drawback is that we have to use relative path when import.

### use Haul bundler

https://github.com/callstack/haul

I tried and it works with symlink out of the box. However:

* Live Reload doesn't work, and Fast Refresh is not supported yet. That mean when you save changes, the app won't automatically reload
* I still prefer Metro because it is shipped with ReactNative
  

