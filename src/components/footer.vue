<template>
  <div class="m-footer">
    <van-tabbar route>
      <van-tabbar-item to="/">
        {{ $t("footer.browse") }}
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/crossChain">
        {{ $t("footer.Cross_chain") }}
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/DAO">
        {{ $t("footer.DAO") }}
        <template #icon="props">
          <img :src="props.active ? icon3.active : icon3.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/exchangeList">
        {{ $t("footer.exchange") }}
        <template #icon="props">
          <img :src="props.active ? icon4.active : icon4.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        {{ $t("footer.director") }}
        <template #icon="props">
          <img :src="props.active ? icon5.active : icon5.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "m-footer",
  data() {
    return {
      activeName: "",
      show: true,

      active: 0,
      icon: {
        inactive: require("../assets/images/home/tab_01@2x.png"),
        active: require("../assets/images/home/tab_01@2x.png"),
      },
      icon2: {
        inactive: require("../assets/images/home/tab_02@2x.png"),
        active: require("../assets/images/home/tab_02@2x.png"),
      },
      icon3: {
        inactive: require("../assets/images/home/tab_03@2x.png"),
        active: require("../assets/images/home/tab_03@2x.png"),
      },
      icon4: {
        inactive: require("../assets/images/home/tab_04@2x.png"),
        active: require("../assets/images/home/tab_04@2x.png"),
      },
      icon5: {
        inactive: require("../assets/images/home/tab_05@2x.png"),
        active: require("../assets/images/home/tab_05@2x.png"),
      },
    };
  },
  computed: {},
  watch: {},
};
</script>
<style lang="less">
.m-footer {
  .van-tabbar {
    background-color: #1a1f29;
    max-width: 375px;
    left: 50%;
    transform: translateX(-50%);
  }
  .van-tabbar-item {
    margin: 4px 0;
    color: #fff;
    border-radius: 6px;
    word-break: break-all;
  }
  .van-tabbar-item--active {
      background-color: #2b3342;
  }
  .van-hairline--top-bottom:after {
    border: none;
  }
}
</style>
