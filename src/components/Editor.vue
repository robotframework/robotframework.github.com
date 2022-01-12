<template>
  <navbar-sub-page title="Code Playground" v-if="isFullEditor" />
  <div class="bg-grey-dark editor-container">
    <div :class="isFullEditor ? 'px-medium' : ''">
      <div class="flex mt-small">
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
              class="alert small mr-xsmall"
              @click="resetProject(); projectHasBeenModified = false">
              Reset
            </button>
          </div>
        </transition>
        <div class="flex">
            <button
              class="stroke ml-xsmall small flex middle"
              @click="copyProject()">
              <copy-icon size="1rem" color="white" />
              <div class="ml-2xsmall">Share</div>
            </button>
            <button
              v-if="!isFullEditor"
              class="stroke ml-xsmall small flex middle"
              @click="openMaximized()">
              <new-tab-icon size="1rem" color="white" />
              <div class="ml-2xsmall">Open Maximized</div>
            </button>
          </div>
      </div>
      <div
        :key="copyMessage"
        class="flex mb-small mt-2xsmall copy-message"
        :class="copyMessage?.success ? 'color-green': 'color-red'"
        style="font-size: var(--type-xsmall);">
        {{copyMessage?.message}}
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
    </div>
    <div class="flex between bottom p-xsmall mt-medium bg-grey-darkest border-bottom-theme border-thin" :class="{['disabled']: isLoadingProject}">
      <!-- file tabs -->
      <transition name="opacity" mode="out-in">
        <div :key="activeProjectName">
          <button
            v-for="{ fileName, hidden } in activeProject?.files"
            :key="fileName"
            v-show="!hidden"
            class="stroke small m-2xsmall bg-grey-darkest"
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
    <div id="monaco-container" :class="{['tab-change-animation']: isChangingTab, ['disabled']: isLoadingProject, ['full-screen-editor']: isFullEditor}"/>
    <transition name="opacity">
      <div v-if="output !== ''" >
        <h4 class="mt-medium" :class="isFullEditor ? 'px-medium' : ''">Console output</h4>
        <pre
          class="console bg-grey-darkest p-medium"
          :class="{ ['running']: isRunning }"
          ref="console"
          id="console"
          ><code
            id="output"
            v-html="output"
            ref="output" /></pre>
      </div>
    </transition>
    <!-- modal buttons -->
    <div v-if="output !== ''" class="flex mt-xsmall" :class="isFullEditor ? 'px-medium pb-medium mb-xlarge' : ''">
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
        <div class="row">
          <div class="col-sm-12 flex end">
            <button @click="showLog = false; showReport = false">
              <close-icon size="2rem" color="white" />
            </button>
          </div>
          <iframe id="report" :src="showLog ? logSrc : reportSrc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { NavbarSubPage } from 'Components'
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
import CloseIcon from './icons/CloseIcon.vue'
import NewTabIcon from './icons/NewTabIcon.vue'
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
    NavbarSubPage,
    ChevronIcon,
    PlayIcon,
    DocumentIcon,
    CopyIcon,
    CloseIcon,
    NewTabIcon
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
    copyMessage: null
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
    async openMaximized() {
      const compProj = await this.getProjectLink()
      this.$router.push({ name: 'Code', query: { codeProject: compProj } })
    },
    async copyProject() {
      const compProj = await this.getProjectLink()
      const url = document.location.origin + '/code/?codeProject=' + compProj
      console.log(url.length)
      if (url.length > 7400) {
        this.copyMessage = { message: `Code to be shared is too long! ~${url.length - 7400} too many characters...`, success: false }
      } else {
        await navigator.clipboard.writeText(url)
        this.copyMessage = { message: 'Link copied to clipboard!', success: true }
      }
    },
    async getProjectLink() {
      const isOfficialProject = this.projectsList.some(({ name }) => name === this.activeProjectName)
      const files = Object.entries(models).map((model) => {
        const content = model[1].getValue()
        const fileFromProject = this.activeProject.files.find(({ fileName }) => fileName === model[0])

        if (fileFromProject.content !== content || !isOfficialProject) {
          return {
            fileName: model[0],
            content: model[1].getValue()
          }
        }
      })
        .filter((a) => a)
      const project = {
        name: this.activeProjectName,
        description: '',
        files: files.filter(({ hidden }) => !hidden),
        derivedProject: isOfficialProject
      }
      console.log(project)
      var strProj = JSON.stringify(project)
      var compProj = LZString.compressToEncodedURIComponent(strProj)
      console.log(`Size of compressed Base 64 fileCatalog is: ${compProj.length} (${compProj.length / (strProj.length / 100)}%)`)
      return compProj
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
        if (project.files.length) {
          proj.description = `## ⚠️ Caution: User Created Content\n\nBe aware that this code is created by a user of that page and not by Robot Framework Foundation. Therefore we are not liable for the content. \n\nIf you run this code it will be executed in your browser.\n\n---\n${proj.description}`
        }
        this.setProject(proj, proj.name)
      } else {
        project.description = '## ⚠️ Caution: User Created Content\n\nBe aware that this code is created by a user of that page and not by Robot Framework Foundation. Therefore we are not liable for the content.\n\nIf you run this code it will be executed in your browser.'
        this.setProject(project, 'Custom code')
      }
    },
    async setProjectFromConfig({ name, dir }, activeFileName, isReset, isInitial) {
      if (this.projectHasBeenModified && !isReset && !window.confirm('Your code modifications will be lost. Are you sure?')) return
      this.isLoadingProject = true
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
      this.copyMessage = null
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
          this.copyMessage = null
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
        vertical: 'hidden',
        alwaysConsumeMouseWheel: false
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
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        this.showLog = false
        this.showReport = false
      }
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
  #monaco-container.full-screen-editor {
    height: calc(100vh - 7rem);
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
    width: 1090px;
    max-width: calc(100% - 5rem);
    margin: 5rem auto;
    height: calc(100% - 10rem);
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
