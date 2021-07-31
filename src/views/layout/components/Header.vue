<template>
  <div class="header-container">
    <div class="menu-list">
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <a-icon :type="$store.state.collapsed.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <ul>
        <li class="info">
          {{$store.state.userInfo.username}}
          <a-icon type="down" />
        </li>
        <li class="button" @click="logout">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("collapsed/asyncChangeCollapsed");
      console.log(this.$store.state.collapsed.collapsed);
    },
    logout() {
      this.$store.dispatch("asyncLogout");
      this.$router.replace({
        name: "Login",
      });
    },
  },
};
</script>

<style>
</style>
