<template>
  <div>
    <div class="row center p-medium pb-xsmall ukraine-blue">
      <div class="col-sm-12 type-center mb-xsmall weight-bold">
        <a
          href="https://oma.unicef.fi/en_US/participant/robot-framework-ry-virtual-workshop-to-help-children-in-ukraine"
          target="_blank"
          class="color-white">
          <div>
            Fundraiser:
          </div>
          <div>
            Virtual workshop to help children in Ukraine
          </div>
        </a>
      </div>
       <div class="type-center mt-small weight-bold">
      </div>
      <h1 class="title type-center">
        ROBOT
      </h1>
    </div>
    <div class="row center p-medium pt-none ukraine-yellow">
      <h1 class="type-center">
        FRAME<br>
        WORK/
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>

  .title::first-line {
    color: var(--color-white);
  }

  .ukraine-blue {
    background: rgb(37,90,181);
  }

  .ukraine-yellow {
    background: rgb(248,215,72);
  }

  .ukraine {
    background: linear-gradient(180deg, rgba(37,90,181,1) 50%, rgba(248,215,72,1) 50%);
  }

</style>
