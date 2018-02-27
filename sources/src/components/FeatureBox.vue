<template>
<section>
    <div class="row justify-content-between">
        <div v-for="item in data" :key="item.header" style="margin-bottom:10px;" class="col-md-4 col-sm-12">
        <b-card 
                :header="item.header"
                class="text-center feature-box">
            <div class="b-card-body" v-html="item.text"/>
        </b-card>
        </div>
    </div>
</section>
</template>

<script>
export default {
  props: ["data"]
};
</script>
