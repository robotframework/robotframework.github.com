<template>
  <div class="editor-container card border-white">
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
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { parseRawGrammar, INITIAL, Registry } from 'vscode-textmate'
import { getProject, getLanguage, getLanguageConfig } from 'Content/code'

export default {
  data: () => ({
    languages: [
      { id: 'python', extensions: ['.py'] },
      { id: 'robotframework', extensions: ['.robot', '.resource'] }
    ],
    files: [],
    activeFileName: '',
    editor: null
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
      this.editor.getModel().setValue(file.content)
      // editor.setModelLanguage
    }
  },
  mounted() {
    this.editor = Object.freeze(monaco.editor.create(document.getElementById('monaco-container'), {
      language: 'python',
      theme: 'vs-dark'
    }))
    monaco.languages.register({ id: 'robotframework' })
    getLanguage('robotframework').then((lang) => {
      const registry = new Registry({
        loadGrammar: () => parseRawGrammar(JSON.stringify(lang), 'example.json')
      })
      registry.loadGrammar('source.robotframework').then((grammar) => {
        monaco.languages.setTokensProvider('robotframework', {
          getInitialState: () => INITIAL,
          tokenize: (line, state) => {
            const tokenizeLineResult2 = grammar.tokenizeLine2(line, state)
            const { tokens, ruleStack: endState } = tokenizeLineResult2
            return { tokens, endState }
          }
        })
      })
    })
    getLanguageConfig('robotframework').then((config) => {
      monaco.languages.setLanguageConfiguration('robotframework', JSON.stringify(config))
    })
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
