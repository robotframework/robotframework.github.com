<template>
  <div class="row">
        <b-tabs pills class="card nav-fill col-lg-12 m-3">
            <div id="{tab.title}-standard" class="card-body row">
              <div v-for="(item,index) in data[0].items" :key="index" class="link col-md-4">
                <div class="col-3 pl-0 mb-3">
                  <a :href="item.href"><img style="width: 100%;" :src="item.img"/></a>
                </div>
                <a :href="item.href" target="_blank">{{item.title}}</a>
                <p v-html="item.text"/>
              </div>
            </div>
        </b-tabs>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .link {
    margin-bottom: 2rem;
  }
}
</style>
