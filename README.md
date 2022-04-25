# chokidar-debounced

## Summary

This package provides debounce behavior to `chokidar`, similar to how `nodemon`'s [delay](https://github.com/remy/nodemon#delaying-restarting) property works.

`chokidar` lacks debounce functionality. This means that when bulk file changes occur, `chokidar` will call the provided callback function multiple times almost-simultaneously. This is, in most cases, undesirable.

Bulk file changes can occur when one:
* Bulk-saves multiple files (e.g. Ctrl+K, Ctrl+S in vscode)
* Copying a directory
* Deleting multiple files
* Etc.

## Usage

`npm install chokidar-debounced`

Default chokidar options (good for most situations):

```typescript
import { watch } from 'chokidar-debounced'

watch(() => console.log('Something changed!'), ['./'])
```

Providing own watcher:

```typescript
import chokidar from 'chokidar'
import { watch } from 'chokidar-debounced'

const watcher = chokidar.watch(['./'], { /* chokidar options */ })

watch(() => console.log('Something changed!'), watcher)
```

Providing a function to call when the watcher has completed initializing (`chokidar`'s `ready` event):

```typescript
import { watch } from 'chokidar-debounced'

watch(() => console.log('Something changed!'), ['./'], 500, () => console.log('Watching for changes...'))
```
