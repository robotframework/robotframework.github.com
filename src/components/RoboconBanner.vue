<template>
  <div class="font-title type-uppercase bg-black color- type-center p-large type-large color-white">
    <div class="row center bottom">
      <div class=" ml-small col-sm-12">
        <div class="timer">
            <span class="color-robocon">{{ countdown.days }}</span> days
            <span class="color-robocon">{{ countdown.hours }}</span> hrs
            <span class="color-robocon">{{ countdown.minutes }}</span> mins
            <span class="color-robocon">{{ countdown.seconds }}</span> sec
        </div>
        <div class="mx-small">
          to
        </div>
      </div>
      <div class="col-sm-12">
        <div class="line-height-1 title-robocon">
          RBCN<span class="color-robocon">23</span>
        </div>
        <div class="line-height-1 mb-small" style="font-size: 1.5rem;">
          ONLINE CONFERENCE
        </div>
      </div>
    </div>
    <a class="type-large color-robocon" href="https://robocon.io/">
      Get your discounted ticket!
    </a>
  </div>
</template>

<script>
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
export default {
  name: 'BannerRobocon',
  data: () => ({
    timeNow: new Date(),
    eventDate: new Date('2023-03-01T09:00Z')
  }),
  computed: {
    countdown() {
      return {
        days: this.numberToPaddedString(differenceInDays(this.eventDate, this.timeNow)),
        hours: this.numberToPaddedString(differenceInHours(this.eventDate, this.timeNow) % 24),
        minutes: this.numberToPaddedString(differenceInMinutes(this.eventDate, this.timeNow) % 60),
        seconds: this.numberToPaddedString(differenceInSeconds(this.eventDate, this.timeNow) % 60)
      }
    }
  },
  mounted() {
    setInterval(() => (this.timeNow = new Date()), 1000)
  },
  methods: {
    numberToPaddedString: (number) => `${number}`.length === 2 ? `${number}` : `0${number}`
  }
}
</script>

<style scoped>
.color-robocon {
  color: #ff9f00;
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
