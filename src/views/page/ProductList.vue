<template>
  <div class="product-list-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <SearchBox @searchSubmit="handleSubmit" :categoryList="categoryList" />
    </div>
    <!-- 表格 -->
    <div class="table">
      <ProductsTable
        :tableData="tableData"
        :page="pagination"
        @changePage="handleChangePage"
      />
    </div>
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue";
import ProductsTable from "@/components/ProductsTable.vue";
import products from "@/api/products";

export default {
  data() {
    return {
      categoryList: [],
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      searchForm: null,
      categoryObj: {},
    };
  },
  async created() {
    const { data } = await products.getCategoryList();
    this.categoryList = data;
    data.forEach((item) => {
      this.categoryObj[item.id] = item;
    });
    this.getData();
  },
  components: {
    SearchBox,
    ProductsTable,
  },
  methods: {
    async getData() {
      const resp = await products.getTableData({
        ...this.searchForm,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      });
      this.tableData = resp.data.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pagination.total = resp.total;
    },
    handleSubmit(form) {
      console.log(form);
      this.searchForm = form;
      this.getData();
    },
    handleChangePage(page) {
      this.pagination = page;
      this.getData();
    },
  },
};
</script>

<style scoped lang="less">
.product-list-container {
  margin-top: 50px;
}
</style>
