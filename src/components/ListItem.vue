<template>
    <div>
        <el-badge :value="item.id" class="item">
            <el-button size="small">{{item.mess}}</el-button>
        </el-badge>
    </div>
</template>

<script>
  export default {
    name: "list-item",
    data() {
      return {}
    },
    mounted() {
      console.log(this.item, "---props")
    },
    props: ['item']
  }
</script>

<style scoped>

</style>