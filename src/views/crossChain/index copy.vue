<template>
  <div class="crossChain">
    <div class="banner">
      <!-- <div>
        <img
          class="banner-box"
          src="@/assets/images/crossChain/banner.png"
          alt=""
        />
      </div> -->
      <h2>{{ $t("crossChain.title") }}</h2>
    </div>
    <div class="main">
      <h3>{{ $t("crossChain.h3") }}</h3>
      <div class="usdt">
        <div class="img_01">
          <img
            class=""
            src="@/assets/images/crossChain/crossChain_03.png"
            alt=""
          />
          USDT
        </div>
        <img
          class="img_02"
          src="@/assets/images/crossChain/crossChain_04.png"
          alt=""
        />
      </div>
      <ul>
        <li>
          <div class="tit">
            {{ $t("crossChain.form") }}
          </div>
          <div class="left_01">
            <img
              class="left_img img1"
              src="@/assets/images/crossChain/crossChain_06.png"
              alt=""
            />
            <span>BSC</span>
          </div>
        </li>
        <li>
          <img
            class="right mt-25"
            src="@/assets/images/crossChain/right.png"
            alt=""
          />
        </li>
        <li>
          <div class="tit">
            {{ $t("crossChain.to") }}
          </div>
          <div class="left_01">
            <img
              class="left_img img2"
              src="@/assets/images/crossChain/crossChain_07.png"
              alt=""
            />
            <span>MTC</span>
            <img
              class="img_02 img3"
              src="@/assets/images/crossChain/crossChain_04.png"
              alt=""
            />
          </div>
        </li>
      </ul>
      <div class="addr">
        <h3>{{ $t("crossChain.addr") }}</h3>
        <div class="usdt">
          <input type="text" :placeholder="$t('crossChain.addr')" />
        </div>
        <p><span class="red">※</span>{{ $t("crossChain.info") }}</p>
        <p class="red mb">({{ $t("crossChain.tips") }})</p>
      </div>
      <div class="number">
        <h3>{{ $t("crossChain.danBiShuL") }}</h3>
        <div class="usdt">
          <span>{{ $t("crossChain.ED") }}100～10000</span>
          <span class="big">{{ $t("crossChain.big") }}</span>
        </div>
        <div class="balance">{{ $t("crossChain.balance") }}：0MTC</div>
      </div>
      <div class="Approve">Approve</div>
      <div class="limit">
        <div class="limit-amount">
          {{ $t("crossChain.limit")
          }}<img src="@/assets/images/crossChain/wenHao.png" alt="" />
        </div>
        <div><strong>8888</strong>/99999BNB</div>
      </div>
      <div class="record">{{ $t("crossChain.record") }}</div>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Button, Icon } from "vant";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },

  computed: {
    // 产品列表数据
  },
  mounted() {
    this.getList();
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
.crossChain {
  background: #f4f8fb;
  min-height: 100vh;
  padding-bottom: 50px;
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
    background: url("~@/assets/images//crossChain/crossChain_01.png") no-repeat
      center center;
    background-size: 100% 100%;
    min-height: 254px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 17px 8px;
    h3 {
      font-size: 13px;
      font-weight: bold;
      color: #1e202d;
    }
    .usdt {
      background: url("~@/assets/images//crossChain/crossChain_02.png")
        no-repeat center center;
      background-size: 100% 100%;
      height: 45px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 9px;
      margin: 12px 0 14px 0;
      input {
        height: 100%;
        border: none;
        width: 100%;
        background: #f2f3f7;
      }
      .img_01 {
        img {
          height: 26px;
          width: 26px;
          vertical-align: middle;
        }
      }
    }
    .img_02 {
      height: 11px;
      width: 6px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      li {
        .left_01 {
          background: url("~@/assets/images//crossChain/crossChain_05.png")
            no-repeat center center;
          background-size: 100% 100%;
          height: 75px;
          width: 130px;
          display: flex;
          align-items: center;
          .left_img {
            height: 31px;
            width: 31px;
          }
          span {
            font-size: 18px;
            font-weight: 500;
            color: #2c2924;
          }
          .img1 {
            margin-left: 17px;
            margin-right: 20px;
          }
          .img2 {
            margin-left: 9px;
            margin-right: 17px;
          }
          .img3 {
            margin-left: 20px;
          }
        }
        .right {
          width: 21px;
          height: 14px;
        }
        .tit {
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #1e202d;
          margin-bottom: 12px;
        }
      }
    }
    .addr {
      p {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #75757a;
        line-height: 20px;
      }
      .red {
        color: #cc1815;
        font-weight: 500;
      }
      .mb {
        margin-bottom: 22px;
      }
    }
    .number {
      // display: flex;
      .big {
        background: #dfe1ed;
        padding: 7px 10px;
        border-radius: 4px;
      }
      .balance {
        font-size: 13px;
        font-weight: bold;
        color: #83818d;
        margin: 16px 0 20px 0;
      }
    }
    .Approve {
      background: url("~@/assets/images//crossChain/crossChain_08.png")
        no-repeat center center;
      background-size: 100% 100%;
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      color: #ffffff;
      margin-bottom: 23px;
    }
    .limit {
      font-size: 12px;
      font-weight: 400;
      color: #1e202d;
      border-bottom: 2px dashed #ccc;
      padding-bottom: 7px;
      .limit-amount {
        margin-bottom: 16px;
        img {
          height: 13px;
          width: 13px;
          vertical-align: middle;
          margin-left: 3px;
        }
      }
    }
    .record {
      font-size: 14px;
      font-weight: 400;
      color: #0b60a9;
      line-height: 23px;
      margin: 37px 0 27px 0;
      text-align: center;
      text-decoration: underline;
    }
  }
}
</style>
