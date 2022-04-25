import chokidar from 'chokidar'

const debounce = <TArgs extends any[], TReturn>(fn: (...args: TArgs) => TReturn, debounceMs: number = 250) => {
  let currentTimeout: any = null
  return (...args: TArgs) => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
      fn(...args)
    }, debounceMs)
  }
}

export const watch = (fn: () => any, dirsOrWatcher: string[] | chokidar.FSWatcher, delayMs: number = 500, onReadyFn?: () => any) => {
  const debouncedFn = debounce(fn, delayMs)
  const watcher = Array.isArray(dirsOrWatcher) ? chokidar.watch(dirsOrWatcher) : dirsOrWatcher

  watcher.on('ready', () => {
    onReadyFn?.()
    watcher.on('all', () => {
      debouncedFn()
    })
  })
}
