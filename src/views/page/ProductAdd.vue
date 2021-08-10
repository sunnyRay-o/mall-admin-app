<template>
  <div class="product-add-container">
    <a-steps :current="current" class="step-container">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <ProductBasic v-if="current === 0" @next="nextInfo" :form="form" />
      <ProductSale
        v-else-if="current === 1"
        @prev="prevInfo"
        @next="nextInfo"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import ProductBasic from "@/components/ProductBasic.vue";
import ProductSale from "@/components/ProductSale.vue";
import productApi from "@/api/products";

export default {
  data() {
    return {
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: "g",
        images: [],
      },
    };
  },
  components: {
    ProductBasic,
    ProductSale,
  },
  async created() {
    if (this.$route.params.id) {
      // 进入到了编辑页面
      const resp = await productApi.productDetail(this.$route.params.id);
      this.form = resp;
    }
  },
  methods: {
    async nextInfo(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        if (this.$route.params.id) {
          // 当前为编辑页面
          await productApi.editProduct(this.form);
          this.$message.success("恭喜，编辑成功！");
          this.$router.push({
            name: "ProductList",
          });
        } else {
          // 当前为新增页面
          await productApi.productAdd(this.form);
          this.$message.success("恭喜,新增成功!");
          this.$router.push({
            name: "ProductList",
          });
        }
      } else {
        this.current += 1;
      }
    },
    prevInfo(form) {
      this.current -= 1;
      this.form = {
        ...this.form,
        form,
      };
    },
  },
};
</script>
<style scoped lang="less">
.product-add-container {
  margin-top: 50px;
  .step-container {
    width: 50%;
    margin: 0 auto;
    padding-top: 15px;
  }
  .steps-content {
    padding-bottom: 50px;
    padding-left: 30px;
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
