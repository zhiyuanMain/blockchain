<template>
  <div class="m-header">
    <div class="top_box">
      <div class="left">
        <img class="category" src="@/assets/images/home/home_03.png" alt />
        <img class="logo" src="@/assets/images/home/logo@2x.png" alt="" />
      </div>
      <div class="search" v-if="$route.name === 'home'">
        <img class="img" src="@/assets/images/home/search.png" alt="" />
        <img
          class="search_icon"
          src="@/assets/images/home/search_icon.png"
          alt=""
        />
      </div>
<!--      <div class="search" v-else>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
        <div class="setting">
          <div class="img">
            <img src="@/assets/images/home/setting.png" alt="" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "exchangeLottery",
  props: {},
  data() {
    return {
      option1: [
        { text: "MTC", value: 0 },
        { text: "BSC", value: 1 },
      ],
      value1: 0,
    };
  },
  watch: {
    // title: {
    //   handler(n, o) {
    //     document.title = this.title || "Bmining";
    //   },
    //   immediate: true,
    // },
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.m-header {
  .top_box {
    background: url("~@/assets/images/home/home_02.png") no-repeat center center;
    background-size: 100% 100%;
    height: 45px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .category {
      width: 35px;
      height: 28px;
      margin-left: 11px;
      margin-right: 10px;
    }
    .logo {
      width: 120px;
      height: 25px;
    }
    .search {
      width: 115px;
      height: 29px;
      display: flex;
      justify-content: flex-end;
      flex: 1;
      text-align: right;
      margin-right: 15px;
      position: relative;
      .img {
        height: 100%;
        height: 100%;
      }
      .search_icon {
        height: 17px;
        width: 16px;
        position: absolute;
        top: 6px;
        right: 8px;
      }
    }
    /deep/.van-dropdown-menu {
      width: 75px;
      height: 29px;
      border-radius: 4px;

      .van-dropdown-menu__bar {
        height: 29px;
      }
    }
    /deep/.van-dropdown-item__content {
      width: 75px;
    }
    /deep/.van-popup--top {
      left: unset;
      right: 46px;
    }
    /deep/.van-overlay {
      background: rgba(0, 0, 0, 0.1);
    }
    .setting {
      width: 30px;
      height: 29px;
      background: #ffffff;
      border-radius: 4px;
      margin-left: 1px;
      .img {
        width: 17px;
        height: 17px;
        margin: 5px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
