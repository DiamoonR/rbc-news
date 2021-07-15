<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" sm="12" v-if="hasImages">
        <v-carousel
          height="100%"
          hide-delimiter-background
          :show-arrows="images.length > 1"
          hide-delimiters
        >
          <v-carousel-item v-for="(image, i) in images" :key="i">
            <v-sheet height="100%">
              <v-row align="center" justify="center">
                <img
                  :src="image.url"
                  style="width:100%; height:auto"
                  @click="showImage(image.url)"
                />
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="12" :md="hasImages ? 6 : 12" sm="12">
        <section class="article">
          <h1>{{ article.title[0] }}</h1>
          <div class="article__date">
            {{ Date.parse(article.pubDate[0]) | formatDate }}
          </div>
          <div class="article__author" v-if="article.author">
            Автор: {{ article.author[0] }}
          </div>
          <div class="article__content">{{ article.description[0] }}</div>
          <div class="article__link">
            Источник:
            <a :href="article.link[0]" target="_blanc">{{ article.link[0] }}</a>
          </div>
        </section>
      </v-col>
    </v-row>
    <v-dialog v-model="enableDialog" max-width="100%">
      <v-card>
        <v-img :src="openImageSrc"></v-img>
        <v-btn color="green darken-1" text @click="enableDialog = false">
          Закрыть
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  async asyncData({ store, params, error }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetch");
    }
    const news = store.getters["news/news"];
    const article = _.find(news, function(item) {
      return item.guid == params.guid;
    });
    if (!article) {
      error({ statusCode: 404, message: "Article not found" });
    }
    return { article };
  },
  data: function() {
    return {
      article: Object,
      enableDialog: false,
      openImageSrc: String
    };
  },
  head() {
    return {
      title: this.article.title[0],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description[0]
        }
      ]
    };
  },
  methods: {
    showImage(url) {
      this.enableDialog = true;
      this.openImageSrc = url;
    }
  },
  computed: {
    hasImages() {
      return !!this.images.length;
    },
    images() {
      try {
        let images = this.article.enclosure;
        images = _.map(images, "$");
        images = _.filter(images, function(item) {
          if (item.type === "image/jpeg") {
            return item;
          }
        });
        return images;
      } catch {
        return null;
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
  }
};
</script>

<style lang="scss" scoped>
.article {
  font-family: Arial;
  h1 {
    font-size: 1.4rem;
    color: black;
    line-height: 1.5rem;
  }
  color: #505156;
  &__date {
    font-size: 0.8rem;
    margin-top: 14px;
    font-style: italic;
  }
  &__author {
    font-size: 0.9rem;
    font-style: italic;
  }
  &__content {
    padding: 8px 0;
  }
}
</style>
