<template>
  <div>
    <ul class="pagin">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ active: item.active }"
        @click.prevent="selectItem(item.val)"
      >
        <span v-if="item.active">{{ item.val }}</span>
        <span v-else>{{ item.val }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pager: Object
  },
  data: function() {
    return {
      //items: [],
      selectedItem: 0
    };
  },
  computed: {
    items() {
      let list = [];
      let steps = this.pager.count / this.pager.pageSize;
      let ost = this.pager.count % this.pager.pageSize;
      let i = 1;
      for (; i <= steps; i++) {
        let item = {
          val: i,
          active: false
        };
        if (i === this.pager.currentPage) {
          item.active = true;
        }
        list.push(item);
      }
      if (ost > 0) {
        let item = {
          val: i,
          active: false
        };
        if (i === this.pager.currentPage) {
          item.active = true;
        }
        list.push(item);
      }
      return list;
    }
  },
  methods: {
    selectItem(item) {
      this.$emit("selectItem", item);
    }
  },
  watch: {
    props: function() {
      setPagin();
    }
  }
};
</script>

<style lang="scss" scoped>
.pagin {
  margin-top: 40px;
  text-align: center;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  li {
    font-size: 90%;
    border-radius: 3px;
    padding: 6px;
    background-color: #0d8bcd;
    margin: 2px;
    width: 30px;
    transition: all ease 0.3s;
    cursor: pointer;
    span {
      color: white;
    }
    &:hover {
      background-color: #0d63cd;
    }
    &.active {
      background-color: lightslategrey;
      cursor: default;
    }
  }
}
</style>
