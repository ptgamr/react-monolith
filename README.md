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

### tweak `metro.config.js`

- `watchFolders`
- `extraNodeModules`
- `blacklistRE`

This approach seems to work fine, the only drawback is that we have to use relative path when import.

### use Haul bundler

https://github.com/callstack/haul

I tried and it works with symlink out of the box. However:

* Live Reload doesn't work, and Fast Refresh is not supported yet. That mean when you save changes, the app won't automatically reload
* I still prefer Metro because it is shipped with ReactNative
  

## Final solution

Combination of `yarn link` & tweaking `metro.config.js`

```
$ cd monolith-shared
$ yarn link

$ cd ../MobileApp
$ yarn link @monolith/shared
```

Update `metro.config.js` to use the package name rather than folder name, detailes in this [commit](https://github.com/ptgamr/react-monolith/commit/afea294494a17d582452fa29efcdcad0b367310e)

That we can get the best of both world, now our App.tsx looks like

```
import {getPlural, usePrevious} from '@monolith/shared/lib';

const App = () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <View>...</View>
  )
}

```
## CAUTION!

If the `linked package` shared any dependencies with the host project, there might be collision of multiple version of same dependency, and funny things could happen.

For example:

```
MobileApp
  react@16.9.1
  pluralize@7.0.0

monolith-shared
  react@16.12.0
  pluralize@8.0.0
```

If that is the case, you might want to add `react` & `pluralize` to the `blacklistRE` inside **metro.config.js**, so that it will always
resolve to the version installed in the host project.

Best is to keep your version synchronized across projects.
