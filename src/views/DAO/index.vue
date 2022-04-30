<template>
  <div class="DAO">
    <div class="banner">
      <h2>DAO</h2>
    </div>
    <div class="main">
      <ul>
        <li class="flex between mb-5">
          <div class="left_box">
            <img src="@/assets/images/DAO/icon.png" alt="" />
            <span class="ml-5">FREE DAO</span>
            <div>0.0000000 FRD</div>
          </div>
          <div class="right_btn01 btn">{{ $t("DAO.btn1") }}</div>
        </li>
        <li class=" mb-5">
          <a href="https://testaaa.tts1.top" class="flex between">
            <div class="left_box">
              <img src="@/assets/images/DAO/icon_02.png" alt="" />
              <span class="ml-5">TTS1 DAO</span>
              <div>0.0000000 TTS1</div>
            </div>
            <div class="right_btn02 btn">{{ $t("DAO.btn") }}</div>
          </a>
        </li>
        <li class="flex between">
          <div class="left_box">
            <img src="@/assets/images/DAO/icon_03.png" alt="" />
            <span class="ml-5">Dream DAO</span>
            <div>0.0000000 DRD</div>
          </div>
          <div class="right_btn03 btn">{{ $t("DAO.btn2") }}</div>
        </li>
        <li class="flex between">
          <div class="left_box">
            <img src="@/assets/images/DAO/icon_04.png" alt="" />
            <span class="ml-5">FUTURE DAO</span>
            <div>0.0000000 FTD</div>
          </div>
          <div class="right_btn04 btn">{{ $t("DAO.btn2") }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "DAO",
  data() {
    return {};
  },
  // components: {
  //   [Tab.name]: Tab,
  //   [Tabs.name]: Tabs,
  //   [Button.name]: Button,
  //   [Icon.name]: Icon,
  // },

  computed: {
    // 产品列表数据
  },
  mounted() {
    // this.getList();
  },

  methods: {
    async getList() {
      const res = await this.$api({
        url: "/chain-blocks",
        method: "get",
        header: { "X-Requested-With": "XMLhttprequest" },
      });
      console.log(res);
    },
  },
};
</script>
<style lang="less">
.DAO {
  background: #f4f8fb;
  height: 100vh;
  margin-bottom: 30px;
  .banner {
    background: url("~@/assets/images/crossChain/banner.png") no-repeat center
      center;
    background-size: 100% 100%;
    height: 254px;
    h2 {
      padding-top: 74px;
      font-size: 19px;
      font-weight: bold;
      color: #ffffff;
      margin-left: 15px;
    }
  }
  .main {
    background: url("~@/assets/images/crossChain/crossChain_01.png") no-repeat
      center center;
    background-size: 100% 100%;
    min-height: 682px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 15px 1px;
    ul {
      li:nth-child(1) {
        background: url("~@/assets/images/DAO/DAO_01.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 100px;
      }
      li:nth-child(2) {
        background: url("~@/assets/images/DAO/DAO_02.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 100px;
      }
      li:nth-child(3) {
        background: url("~@/assets/images/DAO/DAO_03.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 100px;
      }
      li:nth-child(4) {
        background: url("~@/assets/images/DAO/DAO_04.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 100px;
      }
      .left_box {
        margin: 15px 0 0 21px;
        color: #ffffff;
        font-size: 19px;
        img {
          height: 22px;
          width: 22px;
          vertical-align: middle;
        }
        > div {
          color: #fefefe;
          margin-top: 16px;
        }
      }
      .btn {
        margin: 15px 15px 0;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
      }
      .right_btn01 {
        background: url("~@/assets/images/DAO/btn_01.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 26px;
        width: 66px;
        color: #093698;
      }
      .right_btn02 {
        background: url("~@/assets/images/DAO/btn_02.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 26px;
        width: 66px;
        color: #1c2403;
      }
      .right_btn03 {
        background: url("~@/assets/images/DAO/btn_03.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 26px;
        width: 66px;
        color: #29030a;
      }
      .right_btn04 {
        background: url("~@/assets/images/DAO/btn_04.png") no-repeat center
          center;
        background-size: 100% 100%;
        height: 26px;
        width: 66px;
        color: #29030a;
      }
    }
  }
}
</style>
