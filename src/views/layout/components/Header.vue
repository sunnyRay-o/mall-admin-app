<template>
  <div class="header-container">
    <div class="menu-list">
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <ul>
        <li class="info">
          欢迎, yanghuanlei
          <a-icon type="down" />
        </li>
        <li class="button">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: this.$store.state.collapsed,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("asyncChangeCollapsed");
      console.log(this.$store.state.collapsed);
    },
  },
};
</script>

<style>
</style>
