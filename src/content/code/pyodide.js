import AnsiUp from './ansi_up'

const runRobotPyPath = '/pyworker/runRobot.py'
const pyodideWebWorkerPath = '/pyworker/py_worker.js'

const ansiUp = new AnsiUp()
var pythonProgram = ''
var pyodideWorker = null

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
}

function clearOutput() {
  document.getElementById('output').innerHTML = ''
  document.querySelector('div.console').style.display = 'block'
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
