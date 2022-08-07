<template>
  <div
      class="col-sm-12 col-lg-9 col-lg-offset-3"
      :style="{ 'overflow-x': 'scroll', 'overflow-y' : 'hidden', 'margin-top': '25px !important' }"
  >
    <iframe style="position: relative; width: 640px; height: 390px;  border: 1px solid black; "
            :src="'https://www.youtube.com/embed/' + videoId + '?html5=1&amp;enablejsapi=1&amp;autoplay=0&amp;rel=0&amp;showinfo=0&amp;modestbranding=1&amp;controls=1&amp;autohide=0&amp;vq=large'" frameborder="0" allowfullscreen
            onload="player1=new YT.Player(this)">
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
