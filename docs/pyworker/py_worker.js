/* eslint-disable */
// webworker.js

// Setup your project to serve `py-worker.js`. You should also serve
// `pyodide.js`, and all its associated `.asm.js`, `.data`, `.json`,
// and `.wasm` files as well:
importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js')

async function loadPyodideAndPackages() {
  console.log('LOAD Pyodide')
  const start = Date.now()
  if (!self.pyodide) {
    self.pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/'
    })
  }
  console.log(`LOAD Mircopip after ${Date.now() - start}ms`)
  const UNVENDORED_STDLIBS = [
    "ssl",
    "lzma",
    "hashlib"
  ]
  await self.pyodide.loadPackage('micropip')
  await self.pyodide.loadPackage(UNVENDORED_STDLIBS)
  console.log(`DONE after ${Date.now() - start}ms`)
  self.pyodide.globals.set('init_globals', Array.from(self.pyodide.globals.toJs().keys()))
}
const pyodideReadyPromise = loadPyodideAndPackages()

self.onmessage = async (event) => {
  await pyodideReadyPromise
  self.pyodide.runPython(`
import js
for key in list(globals().keys()):
    if key not in init_globals and key not in ['init_globals', 'js', 'sys']:
        del globals()[key]
`)
  const { python, ...context } = event.data
  for (const key of Object.keys(context)) {
    self.pyodide.globals.set(key, context[key])
  }
  try {
    await self.pyodide.loadPackagesFromImports(python)
    const results = await self.pyodide.runPythonAsync(python)
    self.postMessage({ results })
  } catch (error) {
    self.postMessage({ error: error.message })
  }
}
