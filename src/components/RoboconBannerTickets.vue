<template>
  <div class="font-title type-uppercase bg-black color- type-left p-large type-large color-white">
    <div class="row left bottom">
      <div class="col-sm-12">
        <div class="line-height-1 title-robocon">
          RBCN<span class="color-robocon">24</span>
        </div>
        <div class="line-height-1 mb-small" style="font-size: 1.5rem;">
          THE 7TH ANNUAL ROBOT FRAMEWORK CONFERENCE
          <a class="color-robocon" style="float: right; font-size: 1.5rem;" href="https://robocon.io/">
            Get your ticket here!
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-robocon {
  color: #b861ff;
}
.title-robocon {
  font-family: RBCN;
  letter-spacing: 0.25rem;
  margin-top: -1rem;
  font-size: 8rem;
}
@media screen and (max-width: 768px) {
  .title-robocon {
    font-size: 27vw;
  }
  .timer {
    font-size: 4vw;
  }
}
</style>
