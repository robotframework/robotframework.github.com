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
          v-for="{ fileName } in activeProject?.files"
          :key="fileName"
          class="stroke small mr-small bg-grey-darkest"
          :class="activeFileName === fileName ? 'active' : 'primary'"
          @click="setActiveFile(fileName)">
          {{ fileName }}
        </button>
      </div>
    </transition>
    <div id="monaco-container" />
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { marked } from 'marked'
import 'Code/editorConfig.js'
// import { parseRawGrammar, INITIAL, Registry } from 'vscode-textmate'
import { getProject, listProjects } from 'Code'
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
      const project = await getProject(projectName)
      project.files.forEach(({ fileName, content }) => {
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
    }
  },
  mounted() {
    editor = monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: 'rf-dark',
      wordWrap: 'on',
      automaticLayout: true,
      minimap: {
        enabled: true
      },
      scrollbar: {
        vertical: 'auto'
        /* alwaysConsumeMouseWheel: false --- would be nice to trap scroll only if you click the editor */
      },
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
    this.setProject('helloWorld')
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
</style>
