<template>
  <div class="editor-container bg-grey-dark card p-large col-sm-12 col-lg-9 col-lg-offset-3 border-white">
    <div class="px-small py-2xsmall">
      <button
        v-for="fileName in fileNames"
        :key="fileName"
        class="stroke small mr-small"
        :class="activeFileName === fileName ? 'active' : 'primary'"
        @click="setActiveFile(fileName)">
        {{ fileName }}
      </button>
    </div>
    <div id="monaco-container" />
  </div>
</template>

<script>
import 'Content/code/editorConfig.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// import { parseRawGrammar, INITIAL, Registry } from 'vscode-textmate'
import { getProject } from 'Content/code'
let editor = {}
const models = {}
const modelStates = {}

export default {
  data: () => ({
    languages: [
      { id: 'python', extensions: ['py'] },
      { id: 'robotframework', extensions: ['robot', 'resource'] }
    ],
    fileNames: null,
    activeFileName: null
  }),
  methods: {
    setProject(files) {
      files.forEach(({ fileName, content }) => {
        const extension = fileName.split('.').at(-1)
        const langId = this.languages.find(({ extensions }) => extensions.includes(extension)).id
        const model = monaco.editor.createModel(content, langId)
        model.updateOptions({ tabSize: 4 })
        models[fileName] = model
      })
      this.fileNames = files.map(({ fileName }) => fileName)
      this.setActiveFile(files[0].fileName)
    },
    setActiveFile(fileName) {
      // save previous file state
      modelStates[this.activeFileName] = editor.saveViewState()

      editor.setModel(models[fileName])
      // restore new file's state if saved
      if (fileName in modelStates) {
        editor.restoreViewState(modelStates[fileName])
      }

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
      },
      model: null
    })
    editor.addCommand(
      monaco.KeyCode.Tab, () => {
        editor.trigger('keyboard', 'type', { text: '    ' })
      },
      'editorTextFocus && !editorHasSelection && !inSnippetMode && !suggestWidgetVisible'
    )

    getProject('helloWorld').then((files) => {
      this.setProject(files)
    })
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
</style>
