<template>
  <div class="rfai-container">
    <h3><span aria-hidden="true">🤖 </span>AI-Powered Guides</h3>
    <p>Get a head start with our expert-crafted guides. Just copy a prompt and paste it into your favorite AI chatbot.</p>

    <PromptGuide
      title="1. Set Up Your Environment"
      subtitle="Get a personal guide to installing Python, RF, and Browser library."
      prompt-url="https://raw.githubusercontent.com/MarketSquare/rf-prompt-forge/main/prompts/01-setup/01-environment-setup.md"
      plausible-event="Copy Setup Prompt"
    />

    <PromptGuide
      title="2. Create Your First Browser Test"
      subtitle="Learn how to write a modern web test with an AI expert."
      prompt-url="https://raw.githubusercontent.com/MarketSquare/rf-prompt-forge/main/prompts/02-test-creation/01-browser-test.md"
      plausible-event="Copy Test Creation Prompt"
    />
  </div>
</template>

<script setup>
import PromptGuide from './PromptGuide.vue'
</script>
