<template>
  <div class="home-container">
    <div class="nav-list">
      <Nav :key="key"/>
    </div>
    <div
      class="main-header"
      :class="{ 'menu-unfold': $store.state.collapsed.collapsed }"
    >
      <Header />
      <router-view></router-view>
    </div>
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
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>
<style lang="less">
@import "~@/assets/css/home";
</style>
