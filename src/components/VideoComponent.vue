<template>
  <div>
    <iframe
      style="width: 100%; aspect-ratio: 16/9;"
      :src="'https://www.youtube.com/embed/' + videoId + '?html5=1&amp;enablejsapi=1&amp;autoplay=0&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;controls=1&amp;autohide=0&amp;vq=large'"
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
</template>
<script>
export default {
  name: 'VideoComponent',
  props: {
    videoId: String
  }
}
</script>
