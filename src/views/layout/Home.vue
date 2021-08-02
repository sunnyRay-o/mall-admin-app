<template>
  <div class="home-container">
    <div class="nav-list">
      <Nav />
    </div>
    <div
      class="main-header"
      :class="{ 'menu-unfold': $store.state.collapsed.collapsed }"
    >
      <Header />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Header from "./components/Header.vue";

export default {
  components: {
    Nav,
    Header,
  },
  data() {
    return {
      collapsed: this.$store.state.collapsed,
    };
  },
};
</script>
<style lang="less">
@import "~@/assets/css/home";
</style>
