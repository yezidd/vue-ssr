<template>
    <div>
        <p>list</p>
        <list-item
                v-for="item in list"
                :key="item.id"
                :item="item"
        />
    </div>
</template>

<script>
  import ListItem from '../components/ListItem';
  import {mapActions,mapState} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
      }
    },
    components: {
      "list-item": ListItem
    },
    beforeMount() {
      console.log(this.$store, "----");
      this.getList().then((res) => {
        console.log(res, "--")
      });
    },
    methods: {
      ...mapActions([
        'getList'
      ])
    },
    computed: {
      ...mapState([
        'list'
      ])
    }
  }
</script>

<style scoped>

</style>