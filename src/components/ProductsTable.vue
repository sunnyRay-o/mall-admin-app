<template>
  <a-table
    :columns="columns"
    :data-source="productData"
    :pagination="page"
    @change="handleChange"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="handleEdit(text, record)">编辑</a-button>
      <a-button @click="handleRemove(text, record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    ellipsis: true,
  },
  {
    title: "标题",
    dataIndex: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
  },
  {
    title: "标签",
    dataIndex: "tags",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
  },
  {
    title: "上架状态",
    dataIndex: "status",
    customRender(text, record) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 200,
    scopedSlots: { customRender: "operation" },
  },
];
export default {
  data() {
    return {
      columns,
    };
  },
  props: ["tableData", "page"],
  computed: {
    productData() {
      return this.tableData.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    handleChange(page) {
      this.$emit("changePage", page);
    },
    handleEdit(text, record) {
      this.$emit("edit", record);
    },
    handleRemove(text, record) {
      this.$emit("remove", record);
    },
  },
};
</script>
