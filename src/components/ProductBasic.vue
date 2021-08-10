<template>
  <div class="product-basic-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      ><a-form-model-item ref="name" label="副标题" prop="title">
        <a-input v-model="form.title" placeholder="请输入商品副标题" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" placeholder="请输入商品描述信息" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="handleChange"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select show-search placeholder="请选择商品子类别" v-model="form.c_item">
          <a-select-option
            v-for="subCategory in categoryItems"
            :key="subCategory"
            :value="subCategory"
          >
            {{ subCategory }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
          placeholder="请选择商品标签"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达"
            >包邮，最晚次日达</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <a-button type="primary" @click="next">下一步</a-button>
  </div>
</template>
<script>
import productsApi from "@/api/products";

export default {
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入商品标题", trigger: "blur" }],
        category: [
          { required: true, message: "请选择商品类目", trigger: "blur" },
        ],
        tags: [{ required: true, message: "请添加商品标签", trigger: "blur" }],
      },
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ["form"],
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const { data } = await productsApi.getCategoryList();
      this.categoryList = data;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
          return true;
        }
        return false;
      });
    },
    handleChange(categoryId) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === categoryId) {
          console.log(categoryId);
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
  },
};
</script>
