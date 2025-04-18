<template>
  <div class="bg-grey-dark color-white editor-container" ref="editorContainer">
    <div :class="isFullEditor ? 'container px-small' : ''">
      <div class="row between" :class="isFullEditor ? 'pt-small' : ''">
        <div class="row">
          <!-- project dropdown -->
          <div
            v-if="projectsList"
            class="dropdown relative mr-xsmall mt-xsmall"
            ref="projectDropdown">
            <button id="project-drop-down" class="stroke small flex middle between bg-grey-darkest" @click="projectDropdownOpen = !projectDropdownOpen">
              <transition name="opacity" mode="out-in">
                <div class="mr-3xsmall ml-2xsmall" :key="activeProjectName">
                  {{ activeProjectName }}
                  <span v-if="editorStatus.projectModified" class="color-alert">(modified)</span>
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
                id="project-dropdown-content"
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
          <div class="flex mt-xsmall">
            <transition name="opacity">
              <button
                v-if="activeProjectName !== 'Custom code' && editorStatus.projectModified"
                id="reset-project-button"
                class="alert small mr-xsmall"
                @click="resetProject(); editorStatus.projectModified = false">
                Reset
              </button>
            </transition>
            <button
              id="copy-project-button"
              class="stroke mr-xsmall small flex middle"
              @click="copyProject()">
              <copy-icon size="1rem" color="white" />
              <div class="ml-2xsmall">Share</div>
            </button>
            <button
              v-if="!isFullEditor"
              id="open-maximized-button"
              class="stroke small flex middle"
              @click="openMaximized()">
              <new-tab-icon size="1rem" color="white" />
              <div class="ml-2xsmall">Open Maximized</div>
            </button>
          </div>
        </div>
        <!-- version dropdown -->
        <div
          v-if="RFVersions"
          class="dropdown relative"
          :class="$store.state.isMobile ? 'mt-large' : 'mt-xsmall'"
          ref="versionDropdown">
          <label class="absolute type-small" style="top: -1.5rem;">version</label>
          <button
            id="version-drop-down"
            class="stroke small flex middle between bg-grey-darkest"
            style="min-width: 7.5rem;"
            @click="versionDropdownOpen = !versionDropdownOpen">
            <transition name="opacity" mode="out-in">
              <div class="mr-3xsmall ml-3xsmall" :key="activeProjectName">
                {{ selectedRFVersion }}
              </div>
            </transition>
            <chevron-icon
              size="1.5rem"
              color="white"
              :direction="versionDropdownOpen ? 'up' : 'down'" />
          </button>
          <transition name="fade">
            <div
              v-if="versionDropdownOpen"
              id="version-dropdown-content"
              class="dropdown-content absolute bg-grey-darkest px-xsmall pb-none pt-small">
              <button
                v-for="version in RFVersions"
                :key="version"
                class="block mb-xsmall color-white type-small"
                :class="selectedRFVersion === version ? 'disabled' : ''"
                @click="selectedRFVersion = version; versionDropdownOpen = false">
                {{ version }}
              </button>
            </div>
          </transition>
        </div>
      </div>
      <div
        :key="copyMessage"
        class="flex mb-small mt-2xsmall copy-message"
        :class="copyMessage?.success ? 'color-green': 'color-red'"
        style="font-size: var(--type-xsmall);">
        {{ copyMessage?.message }}
      </div>
      <!-- project description -->
      <transition name="opacity" mode="out-in">
        <article :key="activeProjectName" :class="{['disabled']: editorStatus.loading}">
          <div
            v-if="activeProject?.description"
            class="project-description color-white"
            v-html="parseMarkdown(activeProject.description)" />
        </article>
      </transition>
    </div>
    <div
      class="flex between bottom p-xsmall mt-medium bg-grey-darkest border-bottom-theme border-thin"
      :class="{['disabled']: editorStatus.loading}"
      :style="$store.state.isMobile && !isFullEditor ? 'margin-left: -1rem; margin-right: -1rem;' : ''">
      <transition name="opacity" mode="out-in">
        <!-- file dropdown (mobile) -->
        <div v-if="$store.state.isMobile" class="dropdown relative mr-xsmall" ref="fileDropdown">
          <button
            id="file-drop-down"
            class="stroke small flex middle between bg-grey-darkest"
            @click="filesDropdownOpen = !filesDropdownOpen">
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
              id="file-dropdown-content"
              class="dropdown-content absolute bg-grey-darkest px-small pb-none pt-small">
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
            :id="'file-tab-' + fileName"
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
      <div v-if="!editorStatus.loading" class="flex">
        <button
          class="theme flex middle"
          :class="editorStatus.running ? 'disabled' : 'bling'"
          id="run-button"
          @click="runRobotTest()">
          <div class="pr-3xsmall weigh-black">{{ editorStatus.running ? '...' : 'Run' }}</div>
          <play-icon color="black" size="1.3rem" />
        </button>
        <!-- <button @click="copyProject()" style="margin-left: var(--size-small);" class="theme type-center">
          <div class="type-xsmall">Copy</div>
        </button> -->
        <!-- <button  @click="runRobotTest(test)" class="stroke bg-grey-darkest">
          <span class="color-theme">Run (reinit)</span>
        </button> -->
      </div>
    </div>
    <div
      id="monaco-container"
      :class="{['tab-change-animation']: editorStatus.changingTab, ['disabled']: editorStatus.loading, ['full-screen-editor']: isFullEditor}"
      :style="$store.state.isMobile ? 'margin-left: -1rem; margin-right: -1rem;' : ''"/>
    <transition name="opacity">
      <div v-if="output !== ''" >
        <h4
          class="mt-medium"
          :class="[isFullEditor ? 'px-medium' : '', $store.state.isMobile ? 'ml-2xsmall' : 'ml-medium']">
          Console output
        </h4>
        <pre
          class="console bg-grey-darkest p-medium"
          :class="{ ['running']: editorStatus.running }"
          :style="$store.state.isMobile ? 'margin-left: -1rem; margin-right: -1rem;' : ''"
          ref="console"
          id="console"
          ><code
            id="output"
            v-html="output"
            :class="$store.state.isMobile ? 'type-small' : ''"
            ref="output" /></pre>
      </div>
    </transition>
    <div v-if="editorStatus.running || editorStatus.runCompleted" class="row between" :class="isFullEditor ? 'px-medium pb-small' : ''">
      <!-- modal buttons -->
      <div class="col-sm-12 col-md-5 flex height-fit mt-small">
        <transition name="opacity">
          <div v-if="logSrc">
            <button id="log.html-button" class="stroke small flex mr-small middle" @click="showLog = true">
              <document-icon color="white" size="1.25rem" />
              <div class="ml-2xsmall">
                log.html
              </div>
            </button>
          </div>
        </transition>
        <transition name="opacity">
          <div v-if="reportSrc">
            <button id="report.html-button" class="stroke small flex middle" @click="showReport = true">
              <document-icon color="white" size="1.25rem" />
              <div class="ml-2xsmall">
                report.html
              </div>
            </button>
          </div>
        </transition>
      </div>
      <!-- next project button -->
      <div v-if="nextProject && editorStatus.runCompleted" class="mt-small">
        <button
          class="theme"
          @click="setProjectFromConfig(nextProject); scrollToTop()">
          next: {{ nextProject.name }}
        </button>
      </div>
      <div v-else-if="editorStatus.running" style="margin-bottom: 3.25rem" />
    </div>
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
import { getProject, getProjectsList, getProjectFromGitHub, getProjectFromLiveDir, getRobotFrameworkVersions } from 'Code'
import { scrollToPosition } from 'Js/scroll.js'
import { runRobot } from 'Code/pyodide.js'
import { getTestCaseRanges, addLibrary } from 'Code/editorConfig.js'
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
    CopyIcon,
    CloseIcon,
    NewTabIcon
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
    robotArgs: {},
    requirements: [],
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
    parseMarkdown(str) {
      return marked.parse(str).replace('<h1', '<h2').replace('</h1', '</h2') // no h1 here plz
    },
    clickFn(ev) {
      if (!this.$refs.projectDropdown?.contains(ev.target)) this.projectDropdownOpen = false
      if (this.$refs.fileDropdown && !this.$refs.fileDropdown.contains(ev.target)) this.filesDropdownOpen = false
      if (this.$refs.versionDropdown && !this.$refs.versionDropdown.contains(ev.target)) this.versionDropdown = false
    },
    scrollToTop() {
      const scrollDuration = 400 // ms
      const { top } = this.$refs.editorContainer.getBoundingClientRect()
      const target = document.scrollingElement.scrollTop + top - 60
      scrollToPosition(target, scrollDuration)
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
        return null
      })
        .filter((a) => a)
      const project = {
        name: this.activeProjectName,
        description: '',
        files: files.filter(({ hidden }) => !hidden),
        derivedProject: isOfficialProject,
        robotVersion: this.selectedRFVersion,
        robotArgs: this.robotArgs,
        requirements: this.requirements
      }
      console.log(project)
      const strProj = JSON.stringify(project)
      const compProj = LZString.compressToEncodedURIComponent(strProj)
      console.log(`Size of compressed Base 64 fileCatalog is: ${compProj.length} (${compProj.length / (strProj.length / 100)}%)`)
      return compProj
    },
    async setProjectFromGitHub(ghURL) {
      const project = await getProjectFromGitHub(ghURL)
      this.setProject(project, 'Custom code')
    },
    async setProjectFromUrl(url) {
      const project = await getProject(url)
      this.setProject(project, 'Custom code')
    },
    async setProjectsFromURL(codeProject) {
      const strProj = LZString.decompressFromEncodedURIComponent(codeProject)
      const project = JSON.parse(strProj)
      console.log(project)
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
        proj.robotVersion = project.robotVersion
        console.log(proj)
        this.setProject(proj, proj.name)
      } else {
        project.description = '## ⚠️ Caution: User Created Content\n\nBe aware that this code is created by a user of that page and not by Robot Framework Foundation. Therefore we are not liable for the content.\n\nIf you run this code it will be executed in your browser.'
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
      if (project.robotArgs) {
        this.robotArgs = project.robotArgs
      }
      if (project.requirements) {
        this.requirements = project.requirements
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
        // scroll output visible and run code after that
        const scrollDuration = 400 // ms
        const { bottom } = this.$refs.console.getBoundingClientRect()
        const target = bottom + document.scrollingElement.scrollTop - window.innerHeight + 120
        scrollToPosition(target, scrollDuration)
        const files = Object.entries(models).map((model) => {
          return {
            fileName: model[0],
            content: model[1].getValue()
          }
        })
        this.editorStatus.running = true
        const init = this.reinstallRF
        setTimeout(() => { runRobot(files, init, tcName, this.selectedRFVersion, this.robotArgs, this.requirements) }, scrollDuration)
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
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: 'rf-dark',
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
    const commandRunSuite = editor.addCommand(0, (ctx, tcName) => { this.runRobotTest(false, tcName) }, '')

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
        const lenses = testCases.map((testCase) => {
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
          lenses,
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
        } else if (urlParams.get('code-url')) {
          this.setProjectFromUrl(urlParams.get('code-url'))
        } else {
          this.setProjectFromConfig(list[0], null, null, true)
        }
      })
    getRobotFrameworkVersions()
      .then((allVersions) => {
        this.RFVersions = allVersions
          .filter((version) => {
            return version.match(/^(3\.2[\d.]*|[4-9][\d.]*)$/)
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
    height: 60vh;
    position: relative;
    background-color: var(--color-background-darkmode);
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
    max-width: calc(100% - 2rem);
    margin: 0.75rem auto;
    height: calc(100% - 4.5rem);
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
