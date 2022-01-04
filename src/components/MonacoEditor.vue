<template>
  <div class="editor-container bg-grey-dark card p-large col-sm-12 col-lg-9 col-lg-offset-3 border-white">
    <div class="px-small py-2xsmall">
      <button
        v-for="{ fileName } in files"
        :key="fileName"
        class="stroke small mr-small"
        :class="activeFileName === fileName ? 'active' : 'primary'"
        @click="activeFileName = fileName">
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

export default {
  data: () => ({
    languages: [
      { id: 'python', extensions: ['.py'] },
      { id: 'robotframework', extensions: ['.robot', '.resource'] }
    ],
    files: [],
    activeFileName: '',
    editor: null,
    lastFileName: ''
  }),
  methods: {
    initEditor({ el, language, value }) {
      this.editor = Object.freeze(monaco.editor.create(el, {
        value,
        language,
        theme: 'vs-dark'
      }))
    }
  },
  watch: {
    activeFileName() {
      const file = this.files.find(({ fileName }) => fileName === this.activeFileName)
      if (this.lastFileName) {
        const lastFileIndex = this.files.findIndex(({ fileName }) => fileName === this.lastFileName)
        this.files[lastFileIndex].content = this.editor.getModel().getValue()
      }
      this.editor.getModel().setValue(file.content)
      const extension = this.activeFileName.substr(this.activeFileName.search(/(\.\w+$)/, 1))
      const language = this.languages.find(lang => { return lang.extensions.includes(extension) })
      monaco.editor.setModelLanguage(this.editor.getModel(), language.id)
      this.lastFileName = this.activeFileName
    }
  },
  mounted() {
    this.editor = Object.freeze(monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'robotframework',
      theme: 'rf-dark',
      wordWrap: 'on',
      automaticLayout: true,
      minimap: {
        enabled: true
      },
      scrollbar: {
        vertical: 'auto'
      }
    }))
    this.editor.getModel().updateOptions({ tabSize: 4 })
    this.editor.addCommand(
      monaco.KeyCode.Tab, () => {
        this.editor.trigger('keyboard', 'type', { text: '    ' })
      },
      'editorTextFocus && !editorHasSelection && !inSnippetMode && !suggestWidgetVisible'
    )

    getProject('helloWorld').then((files) => {
      this.files = files
      const { fileName, content } = files[0] // lets init editor with first file
      this.activeFileName = fileName
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
