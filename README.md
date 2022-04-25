# chokidar-debounced

This package provides debounce behavior to `chokidar`, similar to how `nodemon`'s [delay](https://github.com/remy/nodemon#delaying-restarting) property works.

`chokidar` lacks debounce functionality. This means that when bulk file changes occur, `chokidar` will call the provided callback function multiple times almost-simultaneously. This is, in most cases, undesirable.

Bulk file changes can occur when one:
* Bulk-saves multiple files (e.g. Ctrl+K, Ctrl+S in vscode)
* Copying a directory
* Deleting multiple files
* Etc.
