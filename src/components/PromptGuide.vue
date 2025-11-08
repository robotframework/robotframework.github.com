<template>
  <details class="rfai-prompt">
    <summary>
      <div>
        <div class="rfai-prompt-title">{{ title }}</div>
        <div class="rfai-prompt-subtitle">{{ subtitle }}</div>
      </div>
      <button
        class="rfai-copy-button"
        @click.prevent.stop="copyAndTrack"
        :class="{ copied: isCopied }"
      >
        <span aria-live="polite" class="visually-hidden">{{ copyStatusMessage }}</span>
        <span aria-hidden="true">{{ isCopied ? 'Copied!' : 'Copy Prompt' }}</span>
      </button>
    </summary>
    <div class="rfai-prompt-content">
      <div v-if="isLoading" class="rfai-loader">Loading prompt...</div>
      <div v-else-if="error" class="rfai-error" v-html="error" />
      <pre v-else>{{ promptText }}</pre>
    </div>
  </details>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  promptUrl: String,
  plausibleEvent: String
})

const isLoading = ref(true)
const promptText = ref('')
const error = ref(null)
const isCopied = ref(false)
const copyStatusMessage = ref('')

const fetchPrompt = async () => {
  try {
    const response = await fetch(props.promptUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }
    promptText.value = await response.text()
  } catch (e) {
    console.error('Failed to fetch prompt:', e)
    error.value = 'Error: Could not load prompt. Please copy it directly from the <a href="https://github.com/MarketSquare/rf-prompt-forge" target="_blank" rel="noopener">source repository</a>.'
  } finally {
    isLoading.value = false
  }
}

const copyAndTrack = () => {
  if (isLoading.value || error.value) {
    alert('Prompt content is not available for copying.')
    return
  }

  navigator.clipboard.writeText(promptText.value)
    .then(() => {
      isCopied.value = true
      copyStatusMessage.value = 'Copied to clipboard!'

      // Fire Plausible event if plausible is available on the window
      if (window.plausible && props.plausibleEvent) {
        window.plausible(props.plausibleEvent)
      }

      setTimeout(() => {
        isCopied.value = false
        copyStatusMessage.value = ''
      }, 2000)
    })
    .catch(err => {
      console.error('Failed to copy text:', err)
      alert('Automatic copy failed. Please select and copy the text manually.')
    })
}

// Fetch the prompt when the component is mounted
onMounted(fetchPrompt)
</script>
