<template>
  <div class="category-container">
    <div class="add-category-wrap">
      <a-button @click="addCategory"> 新增 </a-button>
      <a-modal
        v-model="visible"
        title="新增标签"
        @ok="handleOk"
        okText="确定"
        cancelText="取消"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 14 }"
        >
          <a-form-model-item ref="id" label="标签ID" required prop="id">
            <a-input v-model="form.id" />
          </a-form-model-item>
          <a-form-model-item ref="name" label="标签名称" required prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item
            ref="cItem"
            label="标签子类别"
            required
            prop="c_items"
          >
            <a-input v-model="form.c_items" placeholder="items Mode" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <a-table :columns="columns" :data-source="data">
      <a slot="operation" slot-scope="text, categoryInfo">
        <a-button @click="editCategory(categoryInfo)"> 编辑 </a-button>
        <a-modal
          v-model="editVisible"
          title="编辑标签"
          @ok="editOk"
          okText="确定"
          cancelText="取消"
          :maskStyle="{ background: 'rgba(255, 255, 255, 0.10)' }"
        >
          <a-form-model
            ref="editForm"
            :model="editForm"
            :rules="editRules"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 14 }"
          >
            <a-form-model-item ref="id" label="标签id" prop="id" required>
              <a-input v-model="editForm.id" />
            </a-form-model-item>
            <a-form-model-item ref="name" label="标签名称" prop="name" required>
              <a-input v-model="editForm.name" />
            </a-form-model-item>
            <a-form-model-item
              ref="c_items"
              label="所属子类别"
              prop="c_items"
              required
            >
              <a-select mode="tags" v-model="editForm.c_items"> </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-modal>
        <a-button @click="deleteCategory(categoryInfo)">删除</a-button>
      </a>
    </a-table>
  </div>
</template>

<script>
import api from "@/api/products";

export default {
  data() {
    return {
      editForm: {
        id: "",
        name: "",
        c_items: [],
      },
      editRules: {},
      columns: [
        { title: "id", dataIndex: "id", key: "id" },
        { title: "名称", dataIndex: "name", key: "name" },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          width: 200,
        },
      ],
      data: [],
      visible: false,
      form: {
        id: "",
        name: "",
        c_items: "",
      },
      editVisible: false,
      rules: {},
      // categoryItem: [],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const resp = await api.getCategoryList();
      this.data = resp.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
    addCategory(e) {
      console.log(e, 1);
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          api
            .addCategory(this.form)
            .then((resp) => {
              console.log(resp);
              this.visible = false;
              this.$message.success("新增成功");
            })
            .catch((error) => {
              console.log(error);
              // this.$message.error(error);
            });
          return true;
        }
        return false;
      });
    },
    async editCategory(categoryInfo) {
      this.editVisible = true;
      console.log("====", categoryInfo);
      this.editForm = categoryInfo;
      const resp = await api.editCategory(this.editForm);
      console.log(resp);
    },
    editOk() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editVisible = false;
          this.$message.success("编辑成功");
          return true;
        }
        return false;
      });
    },
    deleteCategory(categoryInfo) {
      console.log(categoryInfo);
      const This = this;
      this.$confirm({
        title: `你确定要要删除名称为${categoryInfo.name}的类目么？`,
        okText: "确定",
        cancelText: "取消",
        async onOk() {
          const resp = await api.deleteCategory(categoryInfo.id);
          console.log(resp);
          This.getCategoryList();
          This.$message.success("删除成功");
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style scoped lang="less">
.category-container {
  margin-top: 50px;
}
</style>
