<template>
<section>
    <div class="row justify-content-between">
        <div v-for="item in data" :key="item.header" style="margin-bottom:10px;" class="col-lg-4">
        <b-card :header="item.header" class="text-center feature-box">
            <div v-if="item.text != ''" class="b-card-body" v-html="item.text"/>
            <div v-if="typeof item.img != 'undefined'" class="b-card-body">
    
                <img center v-b-modal="item.header" :src="item.img" style="cursor:pointer;" class="img-fluid"/>
                <b-modal 
                    hide-footer
                    hide-header
                    :id="item.header" 
                    centered>
                    <img center fluid class="img-fluid" :src="item.img_big"/>  
                   <!-- <p style="text-align:center;"><a @click="openTab(item.img_big)" :href="item.img_big">Open image in new tab</a></p>-->
                </b-modal>

            </div>
        </b-card>
        

        </div>
        
    </div>
</section>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    openTab(href) {
      var image = new Image();
      image.src = href;
      const w = window.open("");
      w.document.write(image.outerHTML);
    }
  }
};
</script>
