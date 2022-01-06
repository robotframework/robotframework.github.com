<template>
  <div class="editor-container bg-grey-dark card p-large">
    <div class="flex between">
      <transition name="opacity" mode="out-in">
        <article :key="activeProject?.name">
          <div
            v-if="activeProject?.description"
            class="project-description"
            v-html="parseMarkdown(activeProject.description)" />
        </article>
      </transition>
      <div
        v-if="activeProject"
        class="dropdown relative type-right flex-shrink-none">
        <button class="stroke flex middle between bg-grey-darkest" @click="projectDropdownOpen = !projectDropdownOpen">
          <transition name="opacity" mode="out-in">
            <div class="mr-2xsmall" :key="activeProject?.name">
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
            style="top: calc(100% + 0.5rem); right: 0; width: 100%; text-align: center;"
            @click="resetProject(); projectHasBeenModified = false">
            reset files
          </button>
        </transition>
        <transition name="fade">
          <div
            v-if="projectDropdownOpen"
            class="dropdown-content absolute bg-grey-darkest p-small pb-none">
            <button
              v-for="projectName in projectNames"
              :key="projectName"
              class="block mb-xsmall color-white"
              :class="activeProject.name === projectName ? 'disabled' : ''"
              @click="setProject(projectName); projectDropdownOpen = false">
              {{ projectName }}
            </button>
          </div>
        </transition>
      </div>
    </div>
    <transition name="opacity" mode="out-in">
      <div class="py-2xsmall" :key="activeProject?.name">
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
    <div id="monaco-container" />
    <button  @click="runRobotTest()" class="stroke small mr-small bg-grey-darkest">
      Run Robot
    </button>
    <button  @click="runRobotTest(true)" class="stroke small mr-small bg-grey-darkest">
      Run Robot (reinit)
    </button>
  <div class="console" hidden>
    <pre class="console"><code class style="overflow: auto;" id="output" disabled=""/></pre>
    </div>
      <iframe id="loghtml" style="width: 100%; height: 800px; display: none;"></iframe>
    </div>
</template>

<script>
import { runRobot } from 'Content/code/pyodide.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { marked } from 'marked'
import 'Code/editorConfig.js'
import { listProjects, loadProjectsByName } from 'Code'
import ChevronIcon from './icons/ChevronIcon.vue'
let editor = {}
const models = {}
const modelStates = {}

export default {
  components: {
    ChevronIcon
  },
  data: () => ({
    languages: [
      { id: 'python', extensions: ['py'] },
      { id: 'robotframework', extensions: ['robot', 'resource'] },
      { id: 'html', extensions: ['html'] },
      { id: 'javascript', extensions: ['js'] }
    ],
    activeProject: null,
    activeFileName: null,
    projectDropdownOpen: false,
    projectNames: listProjects(),
    projectHasBeenModified: false
  }),
  methods: {
    parseMarkdown(str) {
      return marked.parse(str)
    },
    async setProject(projectName, activeFileName) {
      const project = await loadProjectsByName(projectName)
      project.files.forEach(({ fileName, content, show }) => {
        const extension = fileName.split('.').at(-1)
        const langId = this.languages.find(({ extensions }) => extensions.includes(extension))?.id
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
      const files = Object.entries(models).map((model) => {
        return {
          fileName: model[0],
          content: model[1].getValue()
        }
      })
      runRobot(files, init)
    }
  },
  mounted() {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: 'rf-dark',
      wordWrap: 'on',
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
    console.log(editor)
    this.setProject('Hello World')

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
    height: 50vh;
    width: calc(100% - 0.25rem);
  }
  .dropdown {
    height: fit-content;
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
  .project-description > :deep(h1) {
    font-size: var(--type-xlarge);
    margin-bottom: var(--size-small);
    color: var(--color-theme);
  }
  .project-description > :deep(h2) {
    font-size: var(--type-large);
    margin-bottom: var(--size-2xsmall);
    color: var(--color-white);
  }
  .project-description > :deep(p) {
    margin-bottom: var(--size-2xsmall);
  }
  div.console {
    display: none;
    width: auto;
    height: 500px;
    border: solid 1px;
    border-radius: 4px;
    overflow: auto;
    padding: 2em;
    background-color: var(--light-background-color);
    color: var(--text-color);
    font-size: 0.9em;
  }
</style>
