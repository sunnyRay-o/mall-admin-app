import axios from "@/axios";

export default {
  // 得到商品类目列表信息
  getCategoryList() {
    return axios.get("/category/all");
  },
  getTableData(params) {
    return axios.get("/products/all", {
      params,
    });
  },
  deleteProduct(params) {
    return axios.delete(`/products/${params.id}`);
  },
};
