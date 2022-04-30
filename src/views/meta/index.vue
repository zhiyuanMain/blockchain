<template>
  <div class="meta">
    <div class="banner">
      <h2>META SWAP</h2>
    </div>
    <div class="main">
      <div class="computing_power">
        <ul>
          <li>
            <div>
              <div class="tit">{{ $t("META.tit1") }}</div>
              <div class="num">988888888</div>
            </div>
          </li>
          <li>
            <div>
              <div class="tit">{{ $t("META.tit2") }}</div>
              <div class="num">200</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="center_box">
        <div class="header">260/600USDT</div>
        <ul>
          <li class="flex between">
            <div class="label">{{ $t("META.distribution") }}</div>
            <div class="value">5.68 FRD</div>
          </li>
          <li class="flex between">
            <div class="label">{{ $t("META.Gratitude") }}</div>
            <div class="value">0.86 FRD</div>
          </li>
          <li class="flex between">
            <div class="label">{{ $t("META.share") }}</div>
            <div class="value">1.26 FRD</div>
          </li>
        </ul>
        <div class="total flex between">
          <span>{{ $t("META.total") }}</span>
          <span>87888888888</span>
        </div>
        <div class="take_out">
          {{ $t("META.take-out") }}
        </div>
      </div>
      <div class="reserve">
        <div class="flex between reserve-box">
          <div class="">
            <div class="tit">{{ $t("META.reserve-data") }}</div>
            <div class="value">200 USDT</div>
          </div>
          <div class="btn" @click="reserve">{{ $t("META.reserve") }}</div>
        </div>
        <div class="info flex between mt-25">
          <div>{{ $t("META.reserve-recode") }}</div>
          <div>
            {{ $t("META.open")
            }}<img src="@/assets/images/meta/down.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="popup-box">
        <div class="popup-box_top flex between">
          <span>{{ $t("META.title") }}</span>
          <span>{{ $t("META.balance") }}：987.566USDT</span>
        </div>
        <div class="popup-box_bottom">
          <div class="flex between mb-15">
            <span>1— 50</span>
            <span>FRD</span>
          </div>
          <div class="flex between mb-15">
            <span>1— 50</span>
            <span>USDT</span>
          </div>
          <div class="next">
            {{ $t("META.next") }}
          </div>
        </div>
      </div>
    </van-popup>
    <div class="close" v-if="show" @click="close">
      <img src="@/assets/images/meta/close.png" alt="" />
    </div>
  </div>
</template>
<script>
import { Popup } from "vant";
export default {
  name: "META",
  data() {
    return {
      show: false,
    };
  },
  components: {
    [Popup.name]: Popup,
  },
  computed: {
    // 产品列表数据
  },
  mounted() {
    // this.getList();
  },

  methods: {
    reserve() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="less" >
.meta {
  background: #f4f8fb;
  min-height: 100vh;
  margin-bottom: 30px;
  padding-bottom: 50px;
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
    min-height: 254px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 15px 1px 50px 1px;
    .computing_power {
      ul {
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        li {
          background: url("~@/assets/images/meta/power.png") no-repeat center
            center;
          background-size: 100% 100%;
          min-height: 82px;
          width: 159px;

          > div {
            padding: 13px 0;
          }
          .tit {
            text-align: center;
            font-size: 13px;
            color: #3a9df2;
            padding: 0 0 15px;
          }
          .num {
            font-size: 18px;
            font-weight: 500;
            color: #1e202d;
            text-align: center;
          }
        }
      }
    }
    .center_box {
      background: url("~@/assets/images/meta/header.png") no-repeat center
        center;
      background-size: 100% 100%;
      min-height: 370px;
      margin-top: 15px;
      font-size: 13px;
      font-weight: 500;
      color: #78797b;
      .header {
        background: url("~@/assets/images/meta/bg.png") no-repeat center center;
        background-size: 100% 100%;
        height: 40px;
        font-size: 17px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 11px;
        line-height: 40px;
      }
      ul {
        background: url("~@/assets/images/meta/list_bg.png") no-repeat center
          center;
        background-size: 100% 100%;
        min-height: 40px;
        margin: 12px 9px;
        li {
          margin: 0 13px;
          height: 56px;
          border-bottom: 0.0625rem solid #e1e1e1;
          .label {
            line-height: 56px;
            // font-size: 13px;
            // font-weight: 500;
            // color: #78797b;
          }
          .value {
            background: #dfe1ed;
            width: 130px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            margin-top: 15px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #1e202d;
            font-size: 14px;
          }
        }
      }
      .total {
        background: #fff;
        height: 52px;
        margin: 12px 9px;
        box-shadow: 5px 5px 2px #dfe1ed;
        font-size: 13px;
        line-height: 52px;
        padding: 0 13px;
        span:last-child {
          color: #1e202d;
        }
      }
      .take_out {
        background: #3a9df2;
        margin: 13px 9px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        // box-shadow: 5px 5px 2px #dfe1ed;
        border-radius: 3px;
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .reserve {
      background: url("~@/assets/images/meta/header.png") no-repeat center
        center;
      background-size: 100% 100%;
      min-height: 160px;
      margin-top: 11px;
      padding: 0 9px;
      padding-top: 13px;
      // padding-bottom: 50px;
      .reserve-box {
        background: #fff;
        padding: 12px;
        .tit {
          font-weight: 500;
          color: #837f7c;
          font-size: 13px;
          text-align: center;
          margin-bottom: 14px;
        }
        .value {
          font-size: 18px;
          font-weight: 500;
          color: #2c2924;
        }
        .btn {
          height: 30px;
          background: #3a9df2;
          border-radius: 20px;
          font-size: 13px;
          font-family: Source Han Sans CN;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          text-align: center;
          margin-top: 10px;
          padding: 0 20px;
        }
      }
      .info {
        color: #837f7c;
        > div:first-child {
          font-size: 13px;
          font-weight: 500;
        }
        > div:last-child {
          font-size: 12px;
          font-weight: 500;
          vertical-align: middle;
          img {
            width: 11px;
            height: 11px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .van-popup {
    border-radius: 20px;
  }
  .popup-box {
    height: 278px;
    width: 336px;
    border-radius: 20px;
    padding: 20px 25px 20px;
    .popup-box_top {
      margin-bottom: 15px;
      span:first-child {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #333333;
      }
      span:first-child {
        font-size: 13px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #666666;
      }
    }
    .popup-box_bottom {
      background: #f1f2f6;
      padding: 16px 10px 21px;
      > div {
        background: #fff;
        height: 44px;
        border-radius: 6px;
        line-height: 44px;
        padding: 0 11px;
        font-size: 12px;
        font-weight: 500;
        span:first-child {
          color: #aeaeae;
        }
        span:last-child {
          color: #3a9bf2;
        }
      }
    }
    .next {
      background: #f44858 !important;
      height: 46px;
      width: 239px;
      margin: 0 auto;
      color: #ffffff;
      font-size: 15px;
      font-weight: 500;
      text-align: center;
      line-height: 46px;
    }
  }
  .close {
    position: absolute;
    bottom: calc(50% - 200px);
    left: 50%;
    z-index: 3000;
    margin-left: -20px;
    img {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
