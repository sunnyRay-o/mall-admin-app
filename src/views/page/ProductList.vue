<template>
  <div class="product-list-container">
    <!-- 搜索框 -->
    <div class="search-box">
      <SearchBox @searchSubmit="handleSubmit" :categoryList="categoryList" />
    </div>
    <a-button class="product-add"
      ><router-link
        :to="{
          name: 'ProductAdd',
        }"
        >新增商品</router-link
      ></a-button
    >
    <!-- 表格 -->
    <div class="table">
      <ProductsTable
        :tableData="tableData"
        :page="pagination"
        @changePage="handleChangePage"
        @edit="handleEditProduct"
        @remove="handleRemoveProduct"
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
    handleEditProduct(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    handleRemoveProduct(record) {
      const This = this;
      this.$confirm({
        title: "确认删除",
        content: `您确定删除标题：${record.title}的商品么？`,
        cancelText: "取消",
        okText: "确定",
        async onOk() {
          const resp = await products.deleteProduct({
            id: record.id,
          });
          console.log(resp);
          This.getData();
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style scoped lang="less">
.product-list-container {
  margin-top: 50px;
  position: relative;
  .product-add {
    position: absolute;
    right: 14px;
    top: 14px;
  }
}
</style>
