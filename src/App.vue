<template>
  <div
    id="app"
    :class="[
      openHome ? 'overflow-hidden' : '',
      'notranslate fs-14',
      `wrap-${$route.name}`,
    ]"
  >
    <van-skeleton
      round
      :loading="loading"
      title
      :row="15"
      :row-width="lineWidths"
      class="app-van-skeleton"
    >
      <nav-header />
      <!-- <m-header /> -->
      <div class="page-con">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta || !$route.meta.keepAlive" />
      </div>
      <m-footer
        v-if="
          $route.name === 'home' ||
            $route.name === 'crossChain' ||
            $route.name === 'DAO' ||
            $route.name === 'exchangeList'
        "
      />
    </van-skeleton>
  </div>
</template>
<script>
import { mapState } from "vuex";
import cookie from "js-cookie";
import Vue from "vue";
Vue.mixin({
  computed: {},
  methods: {
    nativePush(name = "", query = {}) {
      this.$router.push({ name: name, query: query });
    },
    nativeRefresh() {
      this.$router.go(0);
    },
  },
});
export default {
  data() {
    return {
      lineWidths: [
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "100%",
        "80%",
        "40%",
      ],
    };
  },
  computed: {
    ...mapState({
      openHome: (state) => state.header.openHome,
      // openAccount: (state) => state.header.openAccount,
      openFilm: (state) => state.common.openFilm,
      loading: (state) => state.common.loading,
      scrollTop: (state) => state.common.scrollTop,
    }),
    channel() {
      return this.$store.state.common.channel;
    },
  },
  async mounted() {
    if (cookie.get("token")) {
      try {
        // await this.$store.dispatch('common/actionsMessageNum', {
        //   params: { msgType: null },
        // })
      } catch (err) {
        console.warn(err);
      }
      try {
        // await this.$store.dispatch('common/actionsUserInfo')
      } catch (err) {
        console.warn(err);
      }
      try {
        // await this.$store.dispatch('account/actionsAccountInfo')
      } catch (err) {
        console.warn(err);
      }
      try {
        // await this.$store.dispatch('common/actionsIsbinded')
      } catch (err) {
        console.warn(err);
      }
      try {
        // await this.$store.dispatch('pay/actionsGetcreateinfo')
      } catch (err) {
        console.warn(err);
      }
    }

    // 关闭全局骨架屏
    this.$store.commit("common/updateLoading", false);
  },
};
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  color: #43425d;
  max-width: 375px;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;

  & > div {
    -webkit-overflow-scrolling: touch;
    // background: #f9f9f9;
    &::-webkit-scrollbar {
      width: 0 !important;
      display: none;
    }
  }
  .page-con {
    min-height: 100vh;
    -webkit-overflow-scrolling: touch;
    & > div {
      // padding-top: 55px;
    }
  }
  &.overflow-hidden {
    overflow: hidden;
    height: 100vh;
    .page-con {
      overflow: hidden;
      height: 100vh;
    }
  }
}
</style>
