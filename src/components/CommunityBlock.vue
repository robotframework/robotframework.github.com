<template>
  <div class="row">
        <b-tabs pills class="nav-fill col-lg-12 m-3 mt-5 mb-5">
            <div id="{tab.title}-standard" class="card-body row">
              <div v-for="(item,index) in withImg" :key="index" class="link col-md-4 row">
                <div class="col-3 p-0">
                  <a :href="item.href"><img style="width: 100%;" :src="item.img"/></a>
                </div>
                <div class="col-9 flex-column justify-content-center d-flex">
                  <div>
                    <a :href="item.href" target="_blank" class="title-big">{{item.title}}</a>
                    <p v-html="item.text"/>
                  </div>
                </div>
              </div>
            </div>
        </b-tabs>
        <b-tabs pills class="card nav-fill col-lg-12 m-3">
            <div id="{tab.title}-standard" class="card-body row">
              <div v-for="(item,index) in withoutImg" :key="index" class="link col-md-4 row">
                <div class="col-12 pl-0 pr-3">
                  <a :href="item.href" target="_blank">{{item.title}}</a>
                  <p v-html="item.text"/>
                </div>
              </div>
            </div>
        </b-tabs>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    withImg () {
      return this.data[0].items.filter(({img}) => img)
    },
    withoutImg () {
      return this.data[0].items.filter(({img}) => !img)
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .link {
    margin-bottom: 2rem;
  }
}

.title-big {
  text-transform: uppercase;
  font-size: 1rem;
  font-family: OCRA;
}
</style>
