<template>
  <div class="nav-container">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed.collapsed"
    >
      <a-sub-menu
        v-for="route in $store.state.menuRoute.menuRoutes"
        :key="route.name"
      >
        <span slot="title">
          <a-icon type="mail" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item v-for="child in route.children" :key="child.name">
          {{ child.meta.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
