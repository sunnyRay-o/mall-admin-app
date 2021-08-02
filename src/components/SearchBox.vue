<template>
  <div class="search-box-container">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item>
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select
          show-search
          placeholder="请输入商品类目"
          option-filter-prop="children"
          style="width: 200px"
          v-model="searchForm.category"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="item in categoryList"
            :value="item.id"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import products from "@/api/products";

export default {
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: "",
      },
      categoryList: [], // 商品类目
    };
  },
  async created() {
    const resp = await products.getCategoryList();
    console.log("----:", resp);
    this.categoryList = resp.data;
    console.log("===", this.categoryList);
  },
  methods: {
    handleSubmit() {
      this.$emit("searchSubmit", this.searchForm);
    },
    handleChange(e) {
      console.log(e);
    },
  },
};
</script>
<style scoped lang="less">
.search-box-container {
  padding: 10px 30px;
}
</style>
