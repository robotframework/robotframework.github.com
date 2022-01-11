<template>
  <div class="editor-container">
    <div class="flex my-small">
      <!-- project dropdown -->
      <div
        v-if="projectsList"
        class="dropdown relative mr-small">
        <button class="stroke small flex middle between bg-grey-darkest" @click="projectDropdownOpen = !projectDropdownOpen">
          <transition name="opacity" mode="out-in">
            <div class="mr-3xsmall ml-2xsmall" :key="activeProjectName">
              {{ activeProjectName }}
              <span v-if="projectHasBeenModified" class="color-alert">(modified)</span>
            </div>
          </transition>
          <chevron-icon
            size="1.5rem"
            color="white"
            :direction="projectDropdownOpen ? 'up' : 'down'" />
        </button>
        <transition name="fade">
          <div
            v-if="projectDropdownOpen"
            class="dropdown-content absolute bg-grey-darkest px-small pb-none pt-small">
            <button
              v-for="project in projectsList"
              :key="project.name"
              class="block mb-xsmall color-white type-small"
              :class="activeProjectName === project.name ? 'disabled' : ''"
              @click="setProjectFromConfig(project); projectDropdownOpen = false">
              {{ project.name }}
            </button>
          </div>
        </transition>
      </div>
      <transition name="opacity">
        <div class="flex" v-if="projectHasBeenModified">
          <button
            v-if="activeProjectName !== 'Custom code'"
            class="alert small mr-small"
            @click="resetProject(); projectHasBeenModified = false">
            Reset
          </button>
          <button
            class="stroke small flex middle"
            :class="{['disabled']: copiedToClipboard}"
            @click="copyProject()">
            <copy-icon size="1rem" color="white" />
            <transition name="opacity" mode="out-in">
              <div :key="copiedToClipboard" class="ml-2xsmall">
                {{ copiedToClipboard ? 'Link copied to clipboard!' : 'Share' }}
              </div>
            </transition>
          </button>
        </div>
      </transition>
    </div>
    <!-- project description -->
    <transition name="opacity" mode="out-in">
      <article :key="activeProjectName" :class="{['disabled']: isLoadingProject}">
        <div
          v-if="activeProject?.description"
          class="project-description"
          v-html="parseMarkdown(activeProject.description)" />
      </article>
    </transition>
    <div class="flex between bottom p-xsmall pl-medium mt-medium bg-grey-darkest border-bottom-theme border-thin" :class="{['disabled']: isLoadingProject}">
      <!-- file tabs -->
      <transition name="opacity" mode="out-in">
        <div :key="activeProjectName">
          <button
            v-for="{ fileName } in activeProject?.files.filter(({ hidden }) => !hidden)"
            :key="fileName"
            class="stroke small mr-xsmall bg-grey-darkest mt-2xsmall"
            :class="activeFileName === fileName ? 'active' : 'primary'"
            @click="setActiveFile(fileName)">
            {{ fileName }}
          </button>
        </div>
      </transition>
      <!-- run buttons -->
      <div class="flex">
        <button @click="runRobotTest()" class="theme flex middle">
          <div class="mr-3xsmall weigh-black">Run</div>
          <play-icon color="black" size="1.35rem" />
        </button>
        <!-- <button @click="copyProject()" style="margin-left: var(--size-small);" class="theme type-center">
          <div class="type-xsmall">Copy</div>
        </button> -->
        <!-- <button  @click="runRobotTest(test)" class="stroke bg-grey-darkest">
          <span class="color-theme">Run (reinit)</span>
        </button> -->
      </div>
    </div>
    <div id="monaco-container" :class="{['tab-change-animation']: isChangingTab, ['disabled']: isLoadingProject}" />
    <transition name="opacity">
      <div v-if="output !== ''">
        <h4 class="mt-medium">Console output</h4>
        <pre class="console bg-grey-darkest p-medium" :class="{ ['running']: isRunning }" ref="console" id="console"><code id="output" v-html="output" ref="output" /></pre>
      </div>
    </transition>
    <!-- modal buttons -->
    <div class="flex mt-xsmall">
      <transition name="opacity">
        <button v-if="logSrc" class="stroke flex mr-small middle" @click="showLog = true">
          <document-icon color="white" size="1.25rem" />
          <div class="ml-2xsmall">
            log.html
          </div>
        </button>
      </transition>
      <transition name="opacity">
        <button v-if="reportSrc" class="stroke flex middle" @click="showReport = true">
          <document-icon color="white" size="1.25rem" />
          <div class="ml-2xsmall">
            report.html
          </div>
        </button>
      </transition>
    </div>
    <!-- modals -->
    <transition name="opacity">
      <div v-if="showLog || showReport" class="log-modal" @click="showLog = false; showReport = false">
        <div>
          <iframe :src="showLog ? logSrc : reportSrc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getProjectsList, getProjectFromGitHub, getProjectFromLiveDir } from 'Code'
import { runRobot } from 'Code/pyodide.js'
import { getTestCaseRanges } from 'Code/editorConfig.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { marked } from 'marked'
import * as LZString from 'Code/lz-string'
import ChevronIcon from './icons/ChevronIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import DocumentIcon from './icons/DocumentIcon.vue'
import CopyIcon from './icons/CopyIcon.vue'
let editor = {}
let models = {}
let modelStates = {}
const languages = [
  { id: 'python', extensions: ['py'] },
  { id: 'robotframework', extensions: ['robot', 'resource'] },
  { id: 'html', extensions: ['html'] },
  { id: 'javascript', extensions: ['js'] },
  { id: 'json', extensions: ['json'] },
  { id: 'xml', extensions: ['xml'] },
  { id: 'yaml', extensions: ['yml', 'yaml'] },
  { id: 'markdown', extensions: ['md'] }
]

export default {
  name: 'Editor',
  components: {
    ChevronIcon,
    PlayIcon,
    DocumentIcon,
    CopyIcon
  },
  data: () => ({
    projectsList: null,
    activeProjectName: null, // the short dropdown name from examples index
    activeProject: null,
    isLoadingProject: false,
    projectHasBeenModified: false,
    activeFileName: null,
    isChangingTab: false,
    isRunning: false,
    projectDropdownOpen: false,
    output: '',
    logSrc: null,
    reportSrc: null,
    showLog: false,
    showReport: false,
    copiedToClipboard: false
  }),
  computed: {
    isFullEditor() {
      return this.$route.name === 'Code'
    }
  },
  methods: {
    parseMarkdown(str) {
      return marked.parse(str).replace('<h1', '<h2').replace('</h1', '</h2') // no h1 here plz
    },
    async copyProject() {
      const files = Object.entries(models).map((model) => {
        return {
          fileName: model[0],
          content: model[1].getValue()
        }
      })
      const project = {
        name: this.activeProject.name,
        description: '',
        files: files
      }
      var strProj = JSON.stringify(project)
      var compProj = LZString.compressToEncodedURIComponent(strProj)
      console.log(`Size of compressed Base 64 fileCatalog is: ${compProj.length} (${compProj.length / (strProj.length / 100)}%)`)
      await navigator.clipboard.writeText(document.location.origin + '/?codeProject=' + compProj + '#getting-started')
      this.copiedToClipboard = true
    },
    async setProjectFromGitHub(ghURL) {
      var project = await getProjectFromGitHub(ghURL)
      this.setProject(project, 'Custom code')
    },
    setProjectsFromURL(codeProject) {
      const strProj = LZString.decompressFromEncodedURIComponent(codeProject)
      var project = JSON.parse(strProj)
      project.description = '## ⚠️ Caution: User Created Content\n\nBe aware that this code is created by a user of that page and not by Robot Framework Foundation. Therefore we are not liable for the content.\n\nIf you run this code it will be executed in your browser.'
      this.setProject(project, 'Custom code')
    },
    async setProjectFromConfig({ name, dir }, activeFileName, isReset) {
      if (this.projectHasBeenModified && !isReset && !window.confirm('Your code modifications will be lost. Are you sure?')) return
      this.isLoadingProject = true
      const project = await getProjectFromLiveDir(dir)
      this.setProject(project, name, activeFileName)
    },
    setProject(project, name, activeFileName) {
      models = {}
      modelStates = {}
      project.files.forEach(({ fileName, content, show }) => {
        const extension = fileName.split('.').at(-1)
        const langId = languages.find(({ extensions }) => extensions.includes(extension))?.id
        const model = monaco.editor.createModel(content, langId)
        model.updateOptions({ tabSize: 4 })
        models[fileName] = model
      })
      this.activeProjectName = name
      this.activeProject = project
      this.setActiveFile(activeFileName || project.files[0].fileName)
      this.projectHasBeenModified = false
      this.copiedToClipboard = false
      this.output = ''
      this.logSrc = null
      this.reportSrc = null
      this.isLoadingProject = false
    },
    resetProject() {
      const oldViewState = editor.saveViewState()
      const currentProject = this.projectsList.find(({ name }) => name === this.activeProjectName)
      this.setProjectFromConfig(currentProject, this.activeFileName, true)
        .then(() => {
          editor.restoreViewState(oldViewState)
          this.output = ''
          this.logSrc = null
          this.reportSrc = null
        })
    },
    setActiveFile(fileName) {
      // save previous file state
      modelStates[this.activeFileName] = editor.saveViewState()
      this.activeFileName = fileName

      // transition for changing tab
      this.isChangingTab = true

      setTimeout(() => {
        editor.setModel(models[fileName])
        // restore new file's state if saved
        if (fileName in modelStates) {
          editor.restoreViewState(modelStates[fileName])
        }

        // event listener for code modification
        editor.getModel().onDidChangeContent((ev) => {
          this.projectHasBeenModified = true
          this.copiedToClipboard = false
        })
      }, 150)
      setTimeout(() => { this.isChangingTab = false }, 300)
    },
    runRobotTest(init = false, tcName = '') {
      this.output = ' '
      this.$nextTick(() => {
        // if output wont be completely visible on screen, scroll
        const { bottom } = this.$refs.console.getBoundingClientRect()
        const offset = bottom - window.innerHeight + 130
        window.scrollTo({
          top: window.scrollY + offset,
          behavior: 'smooth'
        })
        const files = Object.entries(models).map((model) => {
          return {
            fileName: model[0],
            content: model[1].getValue()
          }
        })
        runRobot(files, init, tcName)
        this.isRunning = true
      })
    }
  },
  watch: {
    showLog() {
      if (this.showLog) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'visible'
    },
    showReport() {
      if (this.showReport) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'visible'
    }
  },
  mounted() {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: 'rf-dark',
      wordWrap: 'off',
      automaticLayout: true,
      minimap: {
        enabled: true,
        showSlider: 'always'
      },
      scrollbar: {
        vertical: 'hidden'
        // alwaysConsumeMouseWheel: false
      },
      scrollBeyondLastLine: false,
      model: null
    })
    editor.addCommand(
      monaco.KeyCode.Tab, () => {
        editor.trigger('keyboard', 'type', { text: '    ' })
      },
      'editorTextFocus && !editorHasSelection && !inSnippetMode && !suggestWidgetVisible'
    )
    editor.addAction({
      id: 'run_robot',
      label: 'Run Suite in Robot',
      keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Enter],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 0,
      run: (ed) => { this.runRobotTest() }
    })
    var commandRunSuite = editor.addCommand(0, (ctx, tcName) => { this.runRobotTest(false, tcName) }, '')

    monaco.languages.registerCodeLensProvider('robotframework', {
      provideCodeLenses: function(model, token) {
        function getTestCaseLense(testCase) {
          return {
            range: {
              startLineNumber: testCase.nr,
              startColumn: 1,
              endLineNumber: testCase.nr + 1,
              endColumn: testCase.name.length
            },
            command: {
              id: commandRunSuite,
              title: 'Run Test',
              tooltip: `Run: ${testCase.name}`,
              arguments: [testCase.name]
            }
          }
        }
        const testCases = getTestCaseRanges(model)
        var lenses = testCases.map((testCase) => {
          return getTestCaseLense(testCase)
        })
        lenses.push({
          range: {
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: 2,
            endColumn: 1
          },
          command: {
            id: commandRunSuite,
            title: 'Run Test Suite',
            tooltip: 'Run Full Test Suite',
            arguments: []
          }
        })
        return {
          lenses: lenses,
          dispose: () => {}
        }
      },
      resolveCodeLens: function(model, codeLens, token) {
        return codeLens
      }
    })

    window.addEventListener('writeOutput', ({ text }) => { this.output += text })
    window.addEventListener('clearOutput', () => { this.output = '' })
    window.addEventListener('writeLog', ({ src }) => {
      // todo: differentiate testFinished and writeLog
      this.logSrc = src
      this.isRunning = false
      this.$nextTick(() => { this.$refs.console.scrollTop = this.$refs.console.scrollHeight })
    })
    window.addEventListener('writeReport', ({ src }) => {
      this.reportSrc = src
    })
    getProjectsList()
      .then((list) => {
        this.projectsList = list
        const urlParams = (new URL(document.location)).searchParams
        if (urlParams.get('codeProject')) {
          this.setProjectsFromURL(urlParams.get('codeProject'))
        } else if (urlParams.get('code-gh-url')) {
          this.setProjectFromGitHub(urlParams.get('code-gh-url'))
        } else {
          this.setProjectFromConfig(list[0])
        }
      })
  }
}
</script>

<style scoped>
  .editor-container {
    width: 100%;
  }
  #monaco-container {
    height: 60vh;
    position: relative;
  }
  .dropdown {
    height: fit-content;
  }
  .dropdown > button {
    min-width: 13rem;
  }
  .dropdown-content {
    z-index: 99;
    width: 100%;
    transform: translateY(-0.25rem);
    border: solid 0.05rem var(--color-white);
    border-top: none;
    border-radius: 0 0 var(--border-radius-rounded) var(--border-radius-rounded);
  }
  .project-description > :deep(h2) {
    font-size: var(--type-large);
    margin-bottom: var(--size-2xsmall);
    color: var(--color-white);
  }
  .project-description > :deep(p) {
    margin-bottom: var(--size-2xsmall);
  }
  .console {
    height: 40vh;
    overflow: auto;
  }
  .console.running {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .console.running > code {
    flex-basis: 100%;
  }
  .log-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #292f3399;
    z-index: 99;
  }
  .log-modal > div {
    width: 860px;
    max-width: calc(100% - 2rem);
    margin: 5rem auto;
    overflow: hidden;
    height: calc(100% - 7rem);
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .tab-change-animation::after {
    animation: fade 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-background-darkmode);
    pointer-events: none;
  }
  @keyframes fade {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
