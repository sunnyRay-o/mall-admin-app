<template>
  <div class="index-container">
    <div class="card">
      <Card />
    </div>
    <div class="charts">
      <Charts />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Charts from "@/components/Charts.vue";

export default {
  components: {
    Card,
    Charts,
  },
};
</script>

<style scoped>
.card {
  margin-top: 50px;
}
</style>
