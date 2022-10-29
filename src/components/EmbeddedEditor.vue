<template>
  <div class="editor-container" ref="editorContainer">
    <transition name="fade">
      <div v-show="!(editorStatus.running || editorStatus.runCompleted)">
        <div
          class="flex between bottom p-xsmall border-bottom-theme border-thin"
          :class="{['disabled']: editorStatus.loading}">
          <transition name="opacity" mode="out-in">
            <!-- file dropdown (mobile) -->
            <div v-if="$store.state.isMobile" class="dropdown relative mr-xsmall" ref="fileDropdown">
              <button class="bg-grey-darkest stroke small flex middle between" @click="filesDropdownOpen = !filesDropdownOpen">
                <transition name="opacity" mode="out-in">
                  <div class="mr-3xsmall ml-2xsmall" :key="activeFileName">
                    {{ activeFileName }}
                  </div>
                </transition>
                <chevron-icon
                  size="1.5rem"
                  color="white"
                  :direction="filesDropdownOpen ? 'up' : 'down'" />
              </button>
              <transition name="fade">
                <div
                  v-if="filesDropdownOpen"
                  class="dropdown-content bg-grey-darkest absolute px-small pb-none pt-small">
                  <button
                    v-for="{ fileName, hidden } in activeProject?.files"
                    :key="fileName"
                    v-show="!hidden"
                    class="block mb-xsmall color-white type-small"
                    :class="activeFileName === fileName ? 'disabled' : ''"
                    @click="setActiveFile(fileName); filesDropdownOpen = false">
                    {{ fileName }}
                  </button>
                </div>
              </transition>
            </div>
            <!-- file tabs (desktop) -->
            <div v-else :key="activeProjectName">
              <button
                v-for="{ fileName, hidden } in activeProject?.files"
                :key="fileName"
                v-show="!hidden"
                class="bg-grey-darkest stroke small m-2xsmall"
                :class="activeFileName === fileName ? 'active' : 'primary'"
                @click="setActiveFile(fileName)">
                {{ fileName }}
              </button>
            </div>
          </transition>
          <!-- run buttons -->
          <div v-if="!editorStatus.loading" class="flex">
            <button
              class="theme flex middle"
              :class="editorStatus.running ? 'disabled' : 'bling'"
              @click="runRobotTest()">
              <div class="pr-3xsmall weigh-black">{{ editorStatus.running ? '...' : 'Run' }}</div>
              <play-icon color="black" size="1.3rem" />
            </button>
          </div>
        </div>
        <div
          id="monaco-container"
          :class="{['tab-change-animation']: editorStatus.changingTab, ['disabled']: editorStatus.loading, ['full-screen-editor']: isFullEditor}">
        </div>
      </div>
    </transition>
    <transition name="fade">
    <div v-show="editorStatus.running || editorStatus.runCompleted" class="row between" :class="isFullEditor ? 'px-medium pb-small' : ''">
      <div>
        <div
          class="flex between bottom p-xsmall border-bottom-theme border-thin"
          :class="{['disabled']: editorStatus.loading}">
          <h4
            :class="[isFullEditor ? 'px-medium' : '', $store.state.isMobile ? 'ml-2xsmall' : 'ml-medium']">
            Console output
          </h4>
          <div class="flex">
            <button
              class="theme flex middle"
              :class="editorStatus.running ? 'disabled' : 'bling'"
              @click="() => {
                setActiveFile(activeFileName)
                editorStatus.runCompleted = false
              }">
              <play-icon color="black" size="1.3rem" style="transform: rotate(180deg);"/>
              <div class="pr-3xsmall weigh-black">{{ editorStatus.running ? '...' : 'Back' }}</div>
            </button>
          </div>
        </div>
        <pre
          class="console p-medium"
          :class="{ ['running']: editorStatus.running }"
          ref="console"
          id="console"
          ><code
            id="output"
            v-html="output"
            class="code-xsmall"
            ref="output" /></pre>
      </div>
      <!-- modal buttons -->
      <div class="col-sm-12 col-md-5 flex height-fit p-xsmall">
        <transition name="opacity">
          <div v-if="logSrc">
            <button class="bg-grey-darkest stroke small flex mr-small middle" @click="showLog = true">
              <document-icon color="white" size="1.25rem" />
              <div class="ml-2xsmall">
                log.html
              </div>
            </button>
          </div>
        </transition>
        <transition name="opacity">
          <div v-if="reportSrc">
            <button class="bg-grey-darkest stroke small flex middle" @click="showReport = true">
              <document-icon color="white" size="1.25rem" />
              <div class="ml-2xsmall">
                report.html
              </div>
            </button>
          </div>
        </transition>
      </div>
    </div>
    </transition>
    <!-- modals -->
    <transition name="opacity">
      <div v-if="showLog || showReport" class="log-modal" @click="showLog = false; showReport = false">
        <div class="row">
          <div class="col-sm-12 flex end mb-xsmall">
            <button @click="showLog = false; showReport = false" class="bg-white rounded">
              <close-icon size="2rem" color="black" class="block" />
            </button>
          </div>
          <iframe id="report" :src="showLog ? logSrc : reportSrc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getProjectsList, getProjectFromGitHub, getProjectFromLiveDir, getRobotFrameworkVersions } from 'Code'
import { runRobot } from 'Code/pyodide.js'
import { getTestCaseRanges, addLibrary } from 'Code/editorConfig.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as LZString from 'Code/lz-string'
import ChevronIcon from './icons/ChevronIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import DocumentIcon from './icons/DocumentIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
let editor = {}
let codeLens = null
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
    CloseIcon
  },
  data: () => ({
    editorStatus: {
      loading: true,
      running: false,
      runCompleted: false,
      projectModified: false,
      changingTab: false
    },
    projectsList: null,
    activeProjectName: null, // the short dropdown name from examples index
    activeProject: null,
    activeFileName: null,
    projectDropdownOpen: false,
    filesDropdownOpen: false,
    output: '',
    logSrc: null,
    reportSrc: null,
    showLog: false,
    showReport: false,
    copyMessage: null,
    RFVersions: [],
    selectedRFVersion: '',
    reinstallRF: false,
    versionDropdownOpen: false
  }),
  computed: {
    isFullEditor() {
      return this.$route.name === 'Code'
    },
    nextProject() {
      if (!this.projectsList || this.isFullEditor) return null
      const currentIndex = this.projectsList.findIndex(({ name }) => name === this.activeProjectName)
      if (currentIndex === undefined || currentIndex === this.projectsList.length - 1) return null
      return this.projectsList[currentIndex + 1]
    }
  },
  methods: {
    clickFn(ev) {
      if (this.$refs.fileDropdown && !this.$refs.fileDropdown.contains(ev.target)) this.filesDropdownOpen = false
    },
    async setProjectFromGitHub(ghURL) {
      var project = await getProjectFromGitHub(ghURL)
      this.setProject(project, 'Custom code')
    },
    async setProjectsFromURL(codeProject) {
      const strProj = LZString.decompressFromEncodedURIComponent(codeProject)
      var project = JSON.parse(strProj)
      if (project.derivedProject) {
        const proj = await getProjectFromLiveDir(this.projectsList.find(({ name }) => name === project.name).dir)
        proj.files = proj.files
          .map((file) => ({
            fileName: file.fileName,
            hidden: file.hidden,
            content: project.files.find(({ fileName }) => fileName === file.fileName)?.content || file.content
          }))
        proj.robotVersion = project.robotVersion
        this.setProject(proj, proj.name)
      } else {
        this.setProject(project, 'Custom code')
      }
    },
    async setProjectFromConfig({ name, dir }, activeFileName, isReset, isInitial) {
      if (this.editorStatus.projectModified && !isReset && !window.confirm('Your code modifications will be lost. Are you sure?')) return
      this.editorStatus.loading = true
      const project = await getProjectFromLiveDir(dir)
      this.setProject(project, name, activeFileName)

      // generate url
      if (!this.activeProjectName || isInitial) return
      let newUrl
      if (this.isFullEditor) newUrl = `${window.location.href.split('?')[0]}?example=${this.activeProjectName}`
      else newUrl = `${window.location.href.split('?')[0].split('#')[0]}?tab=0&example=${this.activeProjectName}#getting-started`
      history.replaceState(null, null, newUrl)
    },
    setProject(project, name, activeFileName) {
      this.editorStatus.runCompleted = false
      models = {}
      modelStates = {}
      project.files.forEach(({ fileName, content }) => {
        const extension = fileName.split('.').at(-1)
        const langId = languages.find(({ extensions }) => extensions.includes(extension))?.id
        const model = monaco.editor.createModel(content, langId)
        model.name = fileName
        model.updateOptions({ tabSize: 4 })
        models[fileName] = model
      })
      this.activeProjectName = name
      this.activeProject = project
      if (project.robotVersion) {
        this.selectedRFVersion = project.robotVersion
      }
      this.setActiveFile(activeFileName || project.files[0].fileName)
      this.editorStatus.projectModified = false
      this.copyMessage = null
      this.output = ''
      this.logSrc = null
      this.reportSrc = null
      this.editorStatus.loading = false
    },
    resetProject() {
      this.reinstallRF = true
      const list = this.projectsList
      const urlParams = (new URL(document.location)).searchParams
      if (urlParams.get('codeProject')) {
        this.setProjectsFromURL(urlParams.get('codeProject'))
      } else if (urlParams.get('code-gh-url')) {
        this.setProjectFromGitHub(urlParams.get('code-gh-url'))
      } else if (urlParams.get('example')) {
        const project = list.find(({ name }) => name === urlParams.get('example'))
        this.setProjectFromConfig(project)
      } else {
        this.setProjectFromConfig(list[0], null, null, true)
      }
    },
    setActiveFile(fileName) {
      // save previous file state
      modelStates[this.activeFileName] = editor.saveViewState()
      this.activeFileName = fileName

      // transition for changing tab
      this.editorStatus.changingTab = true

      setTimeout(() => {
        editor.setModel(models[fileName])
        // restore new file's state if saved
        if (fileName in modelStates) {
          editor.restoreViewState(modelStates[fileName])
        }

        // event listener for code modification
        editor.getModel().onDidChangeContent((ev) => {
          this.editorStatus.projectModified = true
          this.copyMessage = null
        })
      }, 150)
      setTimeout(() => { this.editorStatus.changingTab = false }, 300)
    },
    runRobotTest(init = false, tcName = '') {
      window.plausible('Run code', { props: { projectName: `${this.activeProjectName}${this.editorStatus.projectModified ? ' (modified)' : ''}` } })
      this.logSrc = null
      this.reportSrc = null
      this.output = ' '
      this.editorStatus.runCompleted = false
      this.$nextTick(() => {
        const files = Object.entries(models).map((model) => {
          return {
            fileName: model[0],
            content: model[1].getValue()
          }
        })
        this.editorStatus.running = true
        const init = this.reinstallRF
        setTimeout(() => { runRobot(files, init, tcName, this.selectedRFVersion) }, 0)
        this.reinstallRF = false
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
    },
    selectedRFVersion() {
      console.log(this.selectedRFVersion)
      this.reinstallRF = true
    }
  },
  mounted() {
    const theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'rf-dark' : 'rf-light'
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: theme,
      wordWrap: 'off',
      automaticLayout: true,
      minimap: {
        enabled: this.$store.state.isDesktop,
        showSlider: 'always'
      },
      scrollbar: {
        vertical: 'hidden',
        alwaysConsumeMouseWheel: false
      },
      mouseWheelZoom: true,
      scrollBeyondLastLine: false,
      model: null,
      fontSize: 14
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
    var commandResetSuite = editor.addCommand(0, (ctx, tcName) => { this.resetProject() }, '')

    codeLens = monaco.languages.registerCodeLensProvider('robotframework', {
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
        lenses.push({
          range: {
            startLineNumber: 1,
            startColumn: 2,
            endLineNumber: 2,
            endColumn: 2
          },
          command: {
            id: commandResetSuite,
            title: 'Reset Test Suite',
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
      this.logSrc = src
    })
    window.addEventListener('writeReport', ({ src }) => {
      this.reportSrc = src
    })
    window.addEventListener('finished', ({ src }) => {
      this.editorStatus.running = false
      this.editorStatus.runCompleted = true
      this.$nextTick(() => { this.$refs.console.scrollTop = this.$refs.console.scrollHeight })
    })
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.showLog = false
        this.showReport = false
      }
    })
    window.addEventListener('click', this.clickFn)
    window.addEventListener('addLibdoc', ({ libdoc }) => {
      addLibrary(JSON.parse(libdoc))
    })
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      monaco.editor.setTheme(event.matches ? 'rf-dark' : 'rf-light')
    })
    getProjectsList()
      .then((list) => {
        this.projectsList = list
        const urlParams = (new URL(document.location)).searchParams
        if (urlParams.get('codeProject')) {
          this.setProjectsFromURL(urlParams.get('codeProject'))
        } else if (urlParams.get('code-gh-url')) {
          this.setProjectFromGitHub(urlParams.get('code-gh-url'))
        } else if (urlParams.get('example')) {
          const project = list.find(({ name }) => name === urlParams.get('example'))
          this.setProjectFromConfig(project)
        } else {
          this.setProjectFromConfig(list[0], null, null, true)
        }
      })
    getRobotFrameworkVersions()
      .then((allVersions) => {
        this.RFVersions = allVersions
          .filter((version) => {
            return version.match(/^(3\.[12][\d.]*|[4-9][\d.]*)$/)
          })
        this.selectedRFVersion = this.RFVersions.at(0)
        if (this.RFVersions[0] !== allVersions[0]) {
          this.RFVersions.unshift(allVersions[0])
        }
      })
  },
  beforeUnmount() {
    if (codeLens) codeLens.dispose()
    window.removeEventListener('click', this.clickFn)
  }
}
</script>

<style scoped>
  .editor-container {
    width: 100%;
  }
  #monaco-container {
    height: 90vh;
    position: relative;
  }
  #monaco-container.full-screen-editor {
    height: calc(100vh - 7rem);
  }
  .dropdown {
    height: fit-content;
  }
  .dropdown > button {
    min-width: 13rem;
    box-shadow: 2px 4px 3px -1px rgba(0,0,0,0.1),
    6px 6px 15px -1px rgba(0,0,0,0.04);
  }
  .dropdown-content {
    z-index: 99;
    width: 100%;
    transform: translateY(-0.25rem);
    border: solid 0.05rem var(--color-white);
    border-top: none;
    border-radius: 0 0 var(--border-radius-rounded) var(--border-radius-rounded);
  }
  .copy-message {
    font-family: 'OCRA';
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
    height: calc(100vh - 7rem);
    width: 100vw;
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
    width: 1090px;
    max-width: calc(100% - 2rem);
    margin: 0.75rem auto;
    height: calc(100% - 4.5rem);
  }
  iframe {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-rounded);
  }
  .tab-change-animation::after {
    animation: fade 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .opacity-enter-active,
  .opacity-leave-active {
    transition: opacity 0.5s ease;
  }

  .opacity-enter-from,
  .opacity-leave-to {
    opacity: 0;
  }
  .code-xsmall {
    font-size: var(--type-xsmall);
  }
  code {
    line-height: 1.5;
    display: block;
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
