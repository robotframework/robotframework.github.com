import LZString from './lz-string'
import AnsiUp from './ansi_up'

const fileList = ['TestObject.py']

const editorElements = document.getElementsByTagName('monaco-editor')
const ansiUp = new AnsiUp()
var pythonProgram = ''
var pyodideWorker = null
var fileCatalog = {}

export function updateFolder(el) {
  updateEditors(el.value)
}

function updateEditors(folder) {
  for (const editorElement of editorElements) {
    loadFileToValue(folder, editorElement)
  }
  initializeFileCatalog(folder)
}

// function updateEditorsFromURL() {
//   initializeFileCatalog('Example')
//   const urlCatalog = LZString.decompressFromEncodedURIComponent((new URL(document.location)).searchParams.get('fileCatalog'))
//   // console.log(urlCatalog)
//   if (urlCatalog !== '') {
//     fileCatalog = JSON.parse(urlCatalog)
//   }
//   for (const editorElement of editorElements) {
//     console.log(`Loading ${editorElement.getAttribute('file')} to element ${editorElement.id}`)
//     editorElement.setAttribute('value', fileCatalog[editorElement.getAttribute('file')])
//     // console.log(fileCatalog[editorElement.getAttribute('file')]);
//   }
// }

function initializeFileCatalog(folder) {
  for (const fileName of fileList) {
    addFileToFileCatalog(folder, fileName)
  }
}

function updateFileCatalog() {
  for (const editorElement of editorElements) {
    fileCatalog[editorElement.getAttribute('file')] = editorElement.getEditorValue()
  }
}

export async function copyFileCatalog() {
  updateFileCatalog()
  fileCatalog['TestObject.py'] = ''
  var strCat = JSON.stringify(fileCatalog)

  var comCat = LZString.compressToEncodedURIComponent(strCat)
  console.log(`Size of compressed Base 64 fileCatalog is: ${comCat.length} (${comCat.length / (strCat.length / 100)}%)`)
  await navigator.clipboard.writeText(document.location.origin + '/?fileCatalog=' + comCat)
}

function addFileToFileCatalog(folder, fileName) {
  fetch(folder + '/' + fileName)
    .then(response => response.text())
    .then(result => { fileCatalog[fileName] = result })
}

function loadFileToPythonProgram() {
  fetch('/pyworker/runRobot.py')
    .then(response => response.text())
    .then(result => { pythonProgram = result })
}

function loadFileToValue(folder, element) {
  const fileName = folder + '/' + element.getAttribute('file')
  console.log(`Loading ${fileName} to element ${element.id}`)
  fetch(fileName)
    .then(response => response.text())
    .then(result => { element.setAttribute('value', result) })
}

function updateLogHtml(html) {
  const iframeContent = escape(html
    .replace(/<a href="#"><\/a>/is, '')
    .replace(/\{\{if source\}\}.*?<\/tr>.*?\{\{\/if\}\}/is, ''))
  document.getElementById('loghtml').src = 'data:text/html;charset=utf-8,' + iframeContent
  document.getElementById('loghtml').style.display = 'block'
}

function clearLogHtml() {
  document.getElementById('loghtml').src = 'data:text/html;charset=utf-8,' + escape('<html><body></body></html>')
}

function writeToOutput(consoleOutput) {
  if (!consoleOutput) return
  const html = ansiUp.ansi_to_html(consoleOutput)
  document.getElementById('output').innerHTML += html
  // console.log(con_out)
}

function clearOutput() {
  document.getElementById('output').innerHTML = ''
  document.querySelector('div.console').style.display = 'block'
}

function run(script, context, onSuccess, onError, initialize) {
  if (!pyodideWorker || initialize) {
    pyodideWorker = new Worker('/pyworker/py_worker.js')
  }
  pyodideWorker.onerror = onError
  pyodideWorker.onmessage = (e) => onSuccess(e.data)
  pyodideWorker.postMessage({
    ...context,
    python: script
  })
}

function asyncRun(script, context, onMessage, initialize) {
  return new Promise((resolve) => {
    run(script, context, (data) => {
      if (Object.prototype.hasOwnProperty.call(data, 'results')) {
        console.log('FINISHED')
        resolve(data)
      } else {
        onMessage(data)
      }
    }, onMessage, initialize)
  })
}

loadFileToPythonProgram()
// if ((new URL(document.location)).searchParams.get('fileCatalog')) {
//   updateEditorsFromURL()
// }
// clearLogHtml()

export async function runRobot(files, initialize = false) {
  clearOutput()
  writeToOutput('Initializing...\n')
  clearLogHtml()
  await asyncRun(pythonProgram, { file_catalog: JSON.stringify(files) }, (data) => {
    // console.log(data) // logging all data coming back
    data = JSON.parse(data)
    writeToOutput(data.std_output)
    if (Object.prototype.hasOwnProperty.call(data, 'html')) {
      updateLogHtml(data.html)
    }
  }, initialize)
  writeToOutput('\nReady!')
}
