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
  // 商品详情
  productDetail(id) {
    return axios.get(`/products/${id}`);
  },
  // 编辑商品
  editProduct(params) {
    return axios.put("/products/edit", params);
  },
  // 新增类目
  addCategory(params) {
    return axios.get("/category/add", {
      params: {
        id: params.id,
        name: params.name,
        c_items: ["点心"],
      },
    });
  },
  // 编辑类目
  editCategory(params) {
    return axios.put("/category/edit", params);
  },
  // 删除类目
  deleteCategory(id) {
    return axios.delete(`/category/${id}`);
  },

};
