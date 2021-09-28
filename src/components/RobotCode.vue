<template>
  <div>
    <highlightjs class="highlight-container" language='robot' :code="code" />
  </div>
</template>

<script>

export default {
  name: 'RobotCode',
  props: {
    code: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.highlight-container {
  max-width: calc(100vw - 2rem);
  margin: 0 auto;
  padding: var(--size-small);
  overflow-x: scroll;
}
@media only screen and (min-width: 1100px) {
  .highlight-container {
    min-width: 720px;
  }
}
.hljs {
  color: #dcdfa4;
}
.hljs-section {
  color: #d4d4d4;
}
.hljs-comment {
  color: #d78d74;
}
.hljs-attribute {
  color: #419bdb;
}
.hljs-variable {
  color: #419bdb;
}
.hljs-name {
  color: #00ccad;
}
.hljs-built_in {
  color: #419bdb;
}
pre > code.hljs {

}
</style>
