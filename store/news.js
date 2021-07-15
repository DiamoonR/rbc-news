export const state = () => ({
  news: []
});

export const mutations = {
  add(state, news) {
    state.news = news;
  }
};

export const actions = {
  async fetch({ commit }) {
    const list = await this.$axios.$get(
      "http://static.feed.rbc.ru/rbc/logical/footer/news.rss"
    );
    let xml2js = require("xml2js");
    let parser = new xml2js.Parser();
    parser.parseString(list, function(error, result) {
      commit("add", result.rss.channel[0].item);
    });
  }
};

export const getters = {
  news: s => {
    return s.news;
  }
};
