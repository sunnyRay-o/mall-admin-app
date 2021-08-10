import axios from "@/axios";

export default {
  // 得到商品类目列表信息
  getCategoryList() {
    return axios.get("/category/all");
  },
  // 得到商品表格数据
  getTableData(params) {
    return axios.get("/products/all", {
      params,
    });
  },
  // 删除商品
  deleteProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
  // 新增商品
  productAdd(params) {
    return axios.post("/products/add", params);
  },
};
