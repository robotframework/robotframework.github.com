<template>
  <div class="row p-2 p-md-1">
    <div v-for="(user, index) in data" :key="index" class="col-lg-2 col-md-3 col-4 mt-5 pr-lg-1 pl-lg-3 pl-md-5 pl-sm-3">
      <div class="text-center p-1 p-md-3 mb-3" style="height:100px;background-color:#fff; display: flex; flex-direction: column; justify-content: center;">
        <div>
          <a :href="user.href"><img class="img-fluid pb-2 user-image" :src="user.img"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>
