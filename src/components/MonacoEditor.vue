<template>
  <div class="editor-container bg-grey-dark card p-large col-sm-12 col-lg-9 col-lg-offset-3 border-white">
    <div class="px-small py-2xsmall">
      <button
        v-for="(fileName, i) in fileNames"
        :key="fileName"
        class="stroke small mr-small"
        :class="activeFileIndex === i ? 'active' : 'primary'"
        @click="activeFileIndex = i">
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
const models = []

export default {
  data: () => ({
    languages: [
      { id: 'python', extensions: ['py'] },
      { id: 'robotframework', extensions: ['robot', 'resource'] }
    ],
    fileNames: null,
    activeFileIndex: null
  }),
  methods: {
    setProject(files) {
      files.forEach(({ fileName, content }) => {
        const extension = fileName.split('.').at(-1)
        const langId = this.languages.find(({ extensions }) => extensions.includes(extension)).id
        const model = monaco.editor.createModel(content, langId)
        model.updateOptions({ tabSize: 4 }) // to all files?
        models.push(model)
      })
      this.fileNames = files.map(({ fileName }) => fileName)
      this.activeFileIndex = 0
    }
  },
  watch: {
    activeFileIndex() {
      editor.setModel(models[this.activeFileIndex])
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
