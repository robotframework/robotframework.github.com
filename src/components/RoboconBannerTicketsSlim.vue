<template>
      <div class="font-title bg-black color-white type-left type-slimbanner between flex type-large">
        <div class="m-small">
          Tickets for <span class="type-uppercase color-robocon">Robocon 2024</span> are on sale now!
        </div>
        <div class="m-small">
          More info at <a class="color-robocon" href="https://robocon.io/">robocon.io</a>.
        </div>
      </div>
</template>

<style scoped>
.color-robocon {
  color: #b861ff;
}

@media screen and (max-width: 1000px) {
  .type-slimbanner {
    justify-content: start;
    flex-wrap: wrap;
    font-size: var(--font-body);

    & > div {
      margin: 0.5rem;
      margin-left: 1rem;
    }
  }
}
</style>
