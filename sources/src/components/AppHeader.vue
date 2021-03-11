<template>
    <div>
      <div class="banner">
        <div class="banner-container">
          <a href="https://robocon.io/">
            <div class="row">
              <div class="col-12 col-lg-6 banner-left">
                <span style="color: white;">RBCN<br>2021</span><br>
                <span id="remote">REMOTE<br>EVENT</span>
              </div>
              <div class="col-6 banner-right">
                <div style="text-align: start; flex-direction: column; justify-content: space-between; display: flex; height: 100%;">
                  <div style="color: rgb(1, 255, 217);">
                    THE 4th ANNUAL<br>
                    ROBOT FRAMEWORK<br>
                    CONFERENCE<br>
                  </div>
                  <div style="color: white;">
                    16-18/Mar-2021<br>
                    UTC+2<br>
                  </div>
                  <div class="pb-2" style="color: white;">
                    A GLOBAL ONLINE<br>
                    SOFTWARE AUTOMATION<br>
                    EVENT<br>
                  </div>
                </div>
              </div>
            </div>
            <div class="banner-description">
              Last chance to buy tickets!
            </div>
          </a>
        </div>
      </div>
      <div class="breaking-news">
        Robot Framework 4.0 has been released! <a href="https://github.com/robotframework/robotframework/blob/master/doc/releasenotes/rf-4.0.rst">Release notes</a>
      </div>
      <section class="header">
        <div class="main-header-container">
          <h1 class="main-header">ROBOT FRAME WORK/</h1>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
.breaking-news {
  background-color: #000;
  color: white;
  text-align: center;
  text-transform: uppercase;
  padding: 0.5rem 0;
  font-family: 'OCRA';
}

.breaking-news > a:hover, a:visited {
  color: rgb(0, 192, 181);
}

@media screen and (max-width: 991px) {
  .banner-right {
    display: none;
  }

  .banner-left {
    text-align: center;
  }

  #remote {
    display: none;
  }
}
</style>
