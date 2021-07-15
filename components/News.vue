<template>
  <div>
    <div class="filters">
      <label>фильтры</label>
      <news-filters
        v-on:updateSearchWord="sortWord"
        v-on:saveDates="sortDates"
      ></news-filters>
    </div>
    <ul v-if="list.length > 0" class="news">
      <li v-for="item in list" :key="item.guid[0]" class="news-item">
        <div class="news-item__date">
          {{ Date.parse(item.pubDate[0]) | formatDate }}
        </div>
        <div class="news-item__title">
          <a href="#" @click.prevent="showArticle(item.guid)">{{
            item.title[0]
          }}</a>
        </div>
        <div class="news-item__decription">
          {{ item.description[0] }}
        </div>
      </li>
    </ul>
    <div v-else>Новостей нет</div>
    <v-pagination
      v-model="page"
      :length="pagesCount"
      :total-visible="7"
      v-if="pager.count > pager.pageSize"
      class="mb-15"
    ></v-pagination>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import NewsFilters from "@/components/NewsFilters.vue";
export default {
  components: {
    "news-filters": NewsFilters
  },
  data() {
    return {
      pager: {
        count: 0,
        pageSize: 5,
        currentPage: 1
      },
      searchString: "",
      dates: []
    };
  },
  props: {
    news: {
      type: Array
    }
  },
  computed: {
    pagesCount: {
      get: function() {
        let steps = this.pager.count / this.pager.pageSize;
        let ost = this.pager.count % this.pager.pageSize;
        if (ost > 0) {
          steps++;
        }
        return Math.trunc(steps);
      }
    },
    page: {
      get: function() {
        return this.pager.currentPage;
      },
      set: function(value) {
        this.pager.currentPage = value;
      }
    },
    list: {
      get: function() {
        let tmpList = this.news;
        let search = this.searchString;

        if (this.searchString.length >= 3) {
          tmpList = _.filter(tmpList, function(item) {
            return item.title[0].toLowerCase().includes(search.toLowerCase());
          });
        }
        let tmpDates = this.dates;
        if (tmpDates.length > 1) {
          tmpList = _.filter(tmpList, function(item) {
            if (
              Date.parse(item.pubDate[0]) >= Date.parse(tmpDates[0]) &&
              Date.parse(item.pubDate[0]) <= Date.parse(tmpDates[1])
            ) {
              return item;
            }
          });
        }

        this.pager.count = tmpList.length;
        let newsNuber = (this.pager.currentPage - 1) * this.pager.pageSize;

        return _.slice(tmpList, newsNuber, newsNuber + this.pager.pageSize);
      }
    }
  },
  filters: {
    formatDate(d) {
      if (d) {
        return moment(d)
          .locale("ru")
          .format("DD MMMM YYYY hh:mm");
      }
    }
  },
  methods: {
    sortDates(dates) {
      this.pager.currentPage = 1;
      this.dates = dates;
    },
    sortWord(value) {
      this.pager.currentPage = 1;
      this.searchString = value;
    },
    showArticle(guid) {
      this.$router.push({
        path: `news/${guid}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  margin: 20px 0;
  padding: 10px;
  //border: 1px solid #e1f5fe;
  border-radius: 6px;
  background-color: #f5f7f9;
  label {
    padding: 10px;
    display: block;
    opacity: 0.5;
    font-size: 0.8rem;
  }
}

.news {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
  color: #505156;
  .news-item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #cfd2de;
    &__date {
      font-size: 0.8rem;
      font-style: italic;
    }
    &__title {
      font-size: 1.2rem;
    }
  }
}
</style>
