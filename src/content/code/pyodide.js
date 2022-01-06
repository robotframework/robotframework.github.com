import AnsiUp from './ansi_up'

const runRobotPyPath = '/pyworker/runRobot.py'
const pyodideWebWorkerPath = '/pyworker/py_worker.js'

const ansiUp = new AnsiUp()
var pythonProgram = ''
var pyodideWorker = null
const writeOutputEvent = new Event('writeOutput')
const clearOutputEvent = new Event('clearOutput')
const writeLogEvent = new Event('writeLog')
const clearLogEvent = new Event('clearLog')

function loadFileToPythonProgram() {
  fetch(runRobotPyPath)
    .then(response => response.text())
    .then(result => { pythonProgram = result })
}

loadFileToPythonProgram()

function updateLogHtml(html) {
  const iframeContent = escape(html
    .replace(/<a href="#"><\/a>/is, '')
    .replace(/\{\{if source\}\}.*?<\/tr>.*?\{\{\/if\}\}/is, ''))
  writeLogEvent.src = 'data:text/html;charset=utf-8,' + iframeContent
  window.dispatchEvent(writeLogEvent)
}

function clearLogHtml() {
  window.dispatchEvent(clearLogEvent)
}

function writeToOutput(consoleOutput) {
  if (!consoleOutput) return
  const html = ansiUp.ansi_to_html(consoleOutput)
  writeOutputEvent.text = html
  window.dispatchEvent(writeOutputEvent)
}

function clearOutput() {
  window.dispatchEvent(clearOutputEvent)
}

function run(script, context, onSuccess, onError, initialize) {
  if (!pyodideWorker || initialize) {
    pyodideWorker = new Worker(pyodideWebWorkerPath)
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

export async function runRobot(files, initialize = false) {
  clearOutput()
  clearLogHtml()
  writeToOutput('Initializing...\n')
  await asyncRun(pythonProgram, { file_catalog: JSON.stringify(files) }, (data) => {
    data = JSON.parse(data)
    writeToOutput(data.std_output)
    if (Object.prototype.hasOwnProperty.call(data, 'html')) {
      updateLogHtml(data.html)
    }
  }, initialize)
  writeToOutput('\nDone!')
}
