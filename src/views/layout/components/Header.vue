<template>
  <div class="header-container">
    <div class="menu-list">
      <a-button
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
      >
        <a-icon
          :type="$store.state.collapsed.collapsed ? 'menu-unfold' : 'menu-fold'"
        />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to="{ name: currentRoute[1].name }">{{
            currentRoute[1] ? currentRoute[1].meta.title : ""
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <ul>
        <li class="info">
          {{ $store.state.userInfo.username }}
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
      currentRoute: this.$router.currentRoute.matched,
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
  watch: {
    $route: {
      handler() {
        // console.log(newValue, oldValue);
        this.currentRoute = this.$router.currentRoute.matched;
      },
    },
  },
};
</script>

<style>
</style>
