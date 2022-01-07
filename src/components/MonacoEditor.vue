<template>
  <div class="editor-container">
    <!-- project dropdown -->
    <div class="flex mb-small mt-small">
      <div
        v-if="activeProject"
        class="dropdown relative">
        <button class="stroke small flex middle between bg-grey-darkest" @click="projectDropdownOpen = !projectDropdownOpen">
          <transition name="opacity" mode="out-in">
            <div class="mr-3xsmall ml-2xsmall" :key="activeProject?.name">
              {{ activeProject?.name }}
              <span v-if="projectHasBeenModified" class="color-error" style="margin-left: -0.5rem">*</span>
            </div>
          </transition>
          <chevron-icon
            size="1.5rem"
            color="white"
            :direction="projectDropdownOpen ? 'up' : 'down'" />
        </button>
        <transition name="opacity">
          <button
            v-if="projectHasBeenModified"
            class="color-error type-small absolute"
            style="top: 0.5rem; left: calc(100% + 0.5rem);"
            @click="resetProject(); projectHasBeenModified = false">
            reset files
          </button>
        </transition>
        <transition name="fade">
          <div
            v-if="projectDropdownOpen"
            class="dropdown-content absolute bg-grey-darkest px-small pb-none pt-small">
            <button
              v-for="projectName in projectNames"
              :key="projectName"
              class="block mb-xsmall color-white type-small"
              :class="activeProject.name === projectName ? 'disabled' : ''"
              @click="setProject(projectName); projectDropdownOpen = false">
              {{ projectName }}
            </button>
          </div>
        </transition>
      </div>
    </div>
    <!-- project description -->
    <transition name="opacity" mode="out-in">
      <article :key="activeProject?.name">
        <div
          v-if="activeProject?.description"
          class="project-description"
          v-html="parseMarkdown(activeProject.description)" />
      </article>
    </transition>
    <div class="flex between bottom mb-xsmall mt-medium">
      <!-- file tabs -->
      <transition name="opacity" mode="out-in">
        <div :key="activeProject?.name">
          <button
            v-for="{ fileName } in activeProject?.files.filter((file) => file.show)"
            :key="fileName"
            class="stroke small mr-small bg-grey-darkest"
            :class="activeFileName === fileName ? 'active' : 'primary'"
            @click="setActiveFile(fileName)">
            {{ fileName }}
          </button>
        </div>
      </transition>
      <!-- run buttons -->
      <div class="flex">
        <button @click="runRobotTest()" class="theme type-center">
          <play-icon color="black" size="1.25rem" />
          <div class="type-xsmall">Run</div>
        </button>
        <!-- <button  @click="runRobotTest(test)" class="stroke bg-grey-darkest">
          <span class="color-theme">Run (reinit)</span>
        </button> -->
      </div>
    </div>
    <div id="monaco-container" />
    <transition name="opacity">
      <div v-if="showOutput">
        <h4 class="mt-medium">Console output</h4>
        <pre class="console bg-grey-darkest p-medium" ref="console"><code id="output" v-html="output" ref="output" />
        </pre>
      </div>
    </transition>
    <transition name="opacity">
      <button v-if="logSrc" class="stroke mt-small flex" @click="showLog = true">
        <document-icon color="white" size="1.25rem" />
        <div class="ml-2xsmall">
          log.html
        </div>
      </button>
    </transition>
    <transition name="opacity">
      <div v-if="showLog" class="log-modal" @click="showLog = false">
        <div>
          <iframe :src="logSrc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { runRobot } from 'Content/code/pyodide.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { marked } from 'marked'
import 'Code/editorConfig.js'
import { listProjects, loadProjectsByName } from 'Code'
import ChevronIcon from './icons/ChevronIcon.vue'
import PlayIcon from './icons/PlayIcon.vue'
import DocumentIcon from './icons/DocumentIcon.vue'
let editor = {}
const models = {}
const modelStates = {}

export default {
  components: {
    ChevronIcon,
    PlayIcon,
    DocumentIcon
  },
  data: () => ({
    languages: [
      { id: 'python', extensions: ['py'] },
      { id: 'robotframework', extensions: ['robot', 'resource'] },
      { id: 'html', extensions: ['html'] },
      { id: 'javascript', extensions: ['js'] },
      { id: 'json', extensions: ['json'] },
      { id: 'xml', extensions: ['xml'] },
      { id: 'yaml', extensions: ['yml', 'yaml'] },
      { id: 'markdown', extensions: ['md'] }
    ],
    activeProject: null,
    activeFileName: null,
    projectDropdownOpen: false,
    projectNames: listProjects(),
    projectHasBeenModified: false,
    showOutput: false,
    output: '',
    logSrc: null,
    showLog: false
  }),
  methods: {
    parseMarkdown(str) {
      return marked.parse(str).replace('<h1', '<h2').replace('</h1', '</h2') // no h1 here plz
    },
    async setProject(projectName, activeFileName) {
      const project = await loadProjectsByName(projectName)
      project.files.forEach(({ fileName, content, show }) => {
        const extension = fileName.split('.').at(-1)
        const langId = this.languages.find(({ extensions }) => extensions.includes(extension))?.id
        console.log(`ext: ${extension}, id: ${langId}`)
        const model = monaco.editor.createModel(content, langId)
        model.updateOptions({ tabSize: 4 })
        models[fileName] = model
      })
      this.activeProject = project
      this.setActiveFile(activeFileName || project.files[0].fileName)
      this.projectHasBeenModified = false
    },
    resetProject() {
      const oldViewState = editor.saveViewState()
      this.setProject(this.activeProject.name, this.activeFileName)
        .then(() => {
          editor.restoreViewState(oldViewState)
        })
    },
    setActiveFile(fileName) {
      // save previous file state
      modelStates[this.activeFileName] = editor.saveViewState()

      editor.setModel(models[fileName])
      // restore new file's state if saved
      if (fileName in modelStates) {
        editor.restoreViewState(modelStates[fileName])
      }

      // event listener for code modification
      editor.getModel().onDidChangeContent((ev) => {
        this.projectHasBeenModified = true
      })

      this.activeFileName = fileName
    },
    runRobotTest(init = false) {
      this.showOutput = true
      this.$nextTick(() => {
        // if output wont be completely visible on screen, scroll
        const { bottom } = this.$refs.console.getBoundingClientRect()
        const offset = bottom - window.innerHeight + 130
        console.log(offset)
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
        runRobot(files, init)
      })
    }
  },
  watch: {
    showLog() {
      if (this.showLog) document.body.style.overflow = 'hidden'
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
    // editor.onDidFocusEditorWidget(() => {
    //   this.editorFocused = true
    // })
    // editor.onDidBlurEditorWidget(() => {
    //   this.editorFocused = false
    // })
    this.setProject('Hello World')
    window.addEventListener('writeOutput', ({ text }) => {
      this.output += text
    })
    window.addEventListener('clearOutput', () => {
      this.output = ''
    })
    window.addEventListener('writeLog', ({ src }) => {
      this.logSrc = src
    })

    // loadConfigFromURL('robotframework.org/live/Example').then(
    //   (data) => {
    //     console.log(data)
    //     this.setProject(data.files)
    //   }
    // )
  }
}
</script>

<style scoped>
  .editor-container {
    width: 100%;
  }
  #monaco-container {
    height: 40vh;
  }
  .dropdown {
    height: fit-content;
  }
  .dropdown > button {
    min-width: 13rem;
  }
  .dropdown button:hover > svg {
    fill: var(--color-theme);
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
    overflow: scroll;
    height: calc(100% - 7rem);
  }
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
