import axios from "@/axios";

export default {
  // 得到商品类目列表信息
  getCategoryList() {
    return axios.get("/category/all");
  },
};
