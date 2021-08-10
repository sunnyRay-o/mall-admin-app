<template>
  <div class="product-sale-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      ><a-form-model-item ref="name" label="商品售价" prop="price">
        <a-input v-model="form.price" placeholder="请输入商品售价" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" placeholder="请输入商品折扣价" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory">
        <a-input v-model="form.inventory" placeholder="请输入商品库存" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit">
        <a-input v-model="form.unit" placeholder="请输入商品计量单位" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <div class="clearfix">
          <a-upload
            :action="
              'https://mallapi.duyiedu.com/upload/images?appkey=' +
              $store.state.userInfo.appkey
            "
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
            name="avatar"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form-model-item>
    </a-form-model>
    <a-button @click="prev">上一步</a-button>
    <a-button @click="next" type="primary">提交</a-button>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      rules: {
        price: [{ required: true, message: "请填写商品售价", trigger: "blur" }],
        price_off: [
          { required: true, message: "请填写商品折扣价", trigger: "blur" },
        ],
        inventory: [
          { required: true, message: "请填写商品库存量", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "请填写商品计量单位", trigger: "blur" },
        ],
      },
      fileList: [],
      previewVisible: false,
      previewImage: "",
    };
  },
  created() {
    if (this.form.images.length > 0) {
      // 当前产品有图片
      this.fileList = this.form.images.map((item, index) => ({
        uid: `-${index}`,
        name: `image${index}.png`,
        status: "done",
        url: item,
      }));
    }
  },
  props: ["form"],
  methods: {
    async handlePreview(file) {
      console.log(file);
      const agencyObj = file;
      if (!file.url && !file.preview) {
        agencyObj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      console.log("change:", file, fileList);
      this.fileList = fileList;
      if (file.status === "done") {
        this.form.images.push(file.response.data.url);
        console.log("images:", this.form.images);
      } else if (file.status === "removed") {
        this.form.images = this.form.images.filter(
          (item) => item !== file.response.data.url,
        );
        console.log("images:", this.form.images);
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    prev() {
      this.$emit("prev", this.form);
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(valid);
          this.$emit("next", this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style scoped lang="less">
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
