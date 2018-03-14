<template>
<section>
<b-nav  v-b-scrollspy:scroller.50 tag="nav" toggleable="md" vertical id="navigation" class="col-sm-3 col-md-2 d-none d-md-block sidebar">
  <b-navbar-brand style="text-transform:uppercase;">
        <b-img :src="require('@/assets/img/ROBOTFW_Mark_White_LOW_cropped.png')" class="img-fluid" alt="Robot Frameworkg logo"/>
  </b-navbar-brand>
    <b-nav-item v-for="item in pages" v-if="item.hide_from_nav != true" v-bind:key="item.title" :href="'#'+item.title">{{item.title}}</b-nav-item>
</b-nav>


 <b-navbar  toggleable="md" fixed="top" type="dark" id="navigation-collapsed" class="d-md-none">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand class="p-0 m-0 d-block d-md-none" href="#">
    ROBOT FRAMEWORK <b-img :src="require('@/assets/img/ROBOTFW_Mark_White_LOW_cropped.png')" class="" style="height:30px;"  alt="Robot Frameworkg logo"/>
  </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="align-middle">
      <template v-for="item in navigation">
            <b-nav-item :href="item.href" v-bind:key="item.name">{{item.name}}</b-nav-item>
      </template>
    </b-navbar-nav>
  </b-collapse>

</b-navbar>
</section>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    onActivate(target) {}
  },
  data() {
    return {
      navigation: [
        { name: "Introduction", href: "#Introduction" },
        { name: "Examples", href: "#Examples" },
        { name: "Libraries", href: "#Libraries" },
        { name: "Tools", href: "#Tools" },
        { name: "Documentation", href: "#Documentation" },
        { name: "Support", href: "#Support" },
        { name: "Foundation", href: "#Foundation" },
        { name: "Shop", href: "#Shop" },
        { name: "RoboCon", href: "#RoboCon" },
        { name: "Users", href: "#Users" }
      ]
    };
  },
  created() {
    this.$root.$on("bv::scrollspy::activate", this.onActivate);
  }
};
</script>
