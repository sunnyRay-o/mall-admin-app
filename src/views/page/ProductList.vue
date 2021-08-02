<template>
  <div class="product-list-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <SearchBox  @searchSubmit="handleSubmit"/>
    </div>
    <!-- 表格 -->
    <div class="table"></div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue";

export default {
  components: {
    SearchBox,
  },
  methods: {
    handleSubmit(params) {
      console.log("###:", params);
    },
  },
};
</script>

<style scoped lang="less">
.product-list-container {
  margin-top: 50px;
}
</style>
