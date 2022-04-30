<template>
  <div class="home">
    <!-- <h3 class="fw-700">{{ $t('home.products.powtitle') }}</h3> -->
    <!-- banner -->
    <div class="banner">
      <div>
        <img
          class="banner-box"
          src="@/assets/images/home/banner@2x.png"
          alt=""
        />
      </div>
    </div>
    <div class="main">
      <div class="list">
        <ul>
          <li>
            <div class="item-top">
              <img src="@/assets/images/home/list_01.png" alt="" />{{
                $t("home.list.title1")
              }}
            </div>
           <div class="num">{{ tx_count }}</div>
          </li>
          <li>
            <div class="item-top">
              <img src="@/assets/images/home/list_02.png" alt="" />{{
                $t("home.list.title2")
              }}
            </div>
            <div class="num">{{ block_count }}</div>
          </li>
          <li class="mt-15">
            <div class="item-top">
              <img src="@/assets/images/home/list_03.png" alt="" />{{
                $t("home.list.title3")
              }}
            </div>
            <div class="num">{{ avg_time }}</div>
          </li>
          <li class="mt-15">
            <div class="item-top">
              <img src="@/assets/images/home/list_04.png" alt="" />{{
                $t("home.list.title4")
              }}
            </div>
           
              <div class="num">{{ address_count }}</div>
          </li>
        </ul>
      </div>
      <div class="Blocks" id="Blocks">
        <div class="more">
          <span class="value">BLOCKS</span>
          <a class="label" href="https://block.metachain1.com/"
            >{{ $t("home.Blocks.more") }}></a
          >
        </div>
        <!--  blocks-->
        <ul class="blocks-ul">
          <li v-for="(item, index) in blocks" :key="index">
            <div v-html="item.chain_block_html"></div>
          </li>
        </ul>
      </div>
      <div class="transactions" id="transactions">
        <div class="more">
          <span class="value">TRANSACTIONS</span>
          <a class="label" href="https://block.metachain1.com/"
            >{{ $t("home.Blocks.more") }}></a
          >
        </div>
        <!--  blocks-->
        <ul class="blocks-ul" id="ul" v-show="false">
          <li v-for="(item, index) in Transactions" :key="index">
            <div v-html="item.transaction_html"></div>
          </li>
        </ul>
        <ul class="transaction-ul">
          <li v-for="(item, index) in tranList" :key="index">
            <div class="flex between">
              <div class="label">{{ item.tile_label }}</div>
              <div>
                <img src="@/assets/images/home/fee.png" alt="" /><span>{{
                  item.text_nowrap
                }}</span>
              </div>
            </div>
            <div class="flex between mt-10">
              <div class="status ">{{ item.status }}</div>
              <div class="fee flex center-v">
                <img src="@/assets/images/home/addr.png" alt="" /><span
                  >{{ item.text_truncate }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
export default {
  name: "home",
  data() {
    return {
      blocks: [],
      Transactions: [],
      tranList: [],
      web3: null,
      address_count: 0,
      block_count: 0,
      avg_time: 0,
      tx_count: 0,
    };
  },

  mounted() {
    this.getList();
    this.transactions();
    this.getWeb3Psc();
    this.wallet();
  },

  methods: {
    async getList() {
      const res = await this.$api({
        url: "/chain-blocks",
        method: "get",
        header: { "X-Requested-With": "XMLhttprequest" },
      });
      if (res.status === 200) {
        this.blocks = res.data.blocks;
      }
      console.log(res);
    },
    async transactions() {
      const res = await this.$api({
        url: "/recent-transactions",
        method: "get",
        // header: { "X-Requested-With": "XMLhttprequest" },
      });
      if (res.status === 200) {
        this.Transactions = res.data.transactions;

        this.$nextTick(() => {
          let tile_label = document.getElementsByClassName("tile-label");
          let status = document.getElementsByClassName("tile-status-label");
          let mtc = document.getElementsByClassName("tile-title");
          let text_nowrap = document.getElementsByClassName(
            "ml-0 ml-md-1 text-nowrap"
          );
          let text_truncate = document.getElementsByClassName(
            "tile-status--success"
          );
          let arr = [];
          this.Transactions.map((item, index) => {
            let obj = {
              tile_label: tile_label[index].innerHTML,
              status: status[index].innerHTML,
              mtc: mtc[index].innerHTML,
              text_nowrap: text_nowrap[index].innerHTML,

              text_truncate: text_truncate[index].getAttribute(
                "data-identifier-hash"
              ),
            };
            arr.push(obj);
          });
          console.log(arr);
          this.tranList = arr;
        });
      }
      console.log(res);
    },
    // wallet
    async wallet() {
      const res = await this.$api({
        url: "/overview",
        method: "get",
        header: { "X-Requested-With": "XMLhttprequest" },
      });
      if (res.data.status) {
        this.address_count = res.data.data.address_count;
        this.block_count = res.data.data.block_count;
        this.avg_time = res.data.data.avg_time;
        this.tx_count = res.data.data.tx_count;
      }
      console.log(res);
    },
    async getWeb3Psc() {
      let web3Provider;
      if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
          // 请求用户授权
          window.ethereum.enable();
        } catch (error) {
          // 用户不授权时
          console.error("User denied account access");
        }
      } else if (window.web3) {
        // 老版 MetaMask Legacy dapp browsers...
        web3Provider = window.web3.currentProvider;
      } else {
        web3Provider = new Web3.providers.HttpProvider(
          // "https://rinkeby.infura.io/v3/5a05b8bc08234c6593e658462cedf995"
          "HTTP://43.129.238.132:7545"
        );
      }
      const web3 = new Web3(web3Provider); //web3js就是你需要的web3实例
      this.web3 = web3;
      // this.BEP20USDT = this.createInstance(this.BEP20USDTAddress, BEP20);
      // this.MetaSwapInstance = this.createInstance(this.MetaSwapAddress, MetaSwap);
      // this.instanceInit(web3);
      const acc = await this.web3.eth.getAccounts();
      console.log(acc);
      this.account = acc[0];
      // console.log(acc[0]);
      // this.account = '0xe0Cb21a790a3AB8280278DDe393c32bD9E6a4181';
      // this.showContent = false;
      // this.isAllowRequest = true;
      // await this.getUserInfo();
      // await this.powerInfofunc(acc[0]);
      // this.getFreeDao(acc[0]);
      // this.getFrdPrice();
      // this.getRedStatus();
      return web3;
    },
  },
};
</script>
<style lang="less">
.home {
  background: #f4f8fb;
  min-height: 100vh;
  margin-bottom: 30px;
  padding-bottom: 50px;
  // margin-top: 45px;
  .banner {
    background: url("~@/assets/images/home/home_01@2x.png") no-repeat center
      center;
    background-size: 100% 100%;
    height: 254px;
    .top_box {
      background: url("~@/assets/images/home/home_02.png") no-repeat center
        center;
      background-size: 100% 100%;
      height: 45px;
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
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
    }
    .banner-box {
      width: 100%;
      height: 254px;
    }
  }
  .main {
    background: url("~@/assets/images/home/home_04.png") no-repeat center center;
    background-size: 100% 100%;
    min-height: 620px;
    margin: 0px 15px;
    margin-top: -60px;
    .list ul {
      padding: 20px 8px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 160px;
        background: #fefdf9;
        border-radius: 6px;
        padding: 15px 0;
        .item-top {
          display: flex;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          color: #837f7c;
          align-items: center;
          vertical-align: middle;
          img {
            height: 18px;
            width: 18px;
          }
        }
        .num {
          font-size: 18px;
          font-weight: normal;
          color: #2c2924;
          text-align: center;
          margin-top: 11px;
        }
      }
    }
    .more {
      height: 40px;
      width: 100%;
      background: #3a9df2;
      display: flex;
      padding: 0 8px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      a {
        color: #ffffff;
      }
      .value {
        justify-content: flex-start;
        display: flex;
        align-items: center;
      }
      .label {
        flex: 1;
        justify-content: flex-end;
        display: flex;
        align-items: center;
      }
    }
    .Blocks {
      ul {
        background: #fff;
        li {
          padding: 10px 8px;
          border-bottom: 1px solid #e1e1e1;
          color: #4a5970;
          position: relative;
          .tile-title {
            color: #4a5970;
            font-size: 13px;
            font-weight: 500;
          }
          .tile-transactions {
            position: absolute;
            top: 10px;
            right: 20px;
          }
          .d-none {
            position: absolute;
            top: 30px;
            right: 20px;
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #3a9df2 !important;
          }

          .d-md-inline-block {
            display: none;
          }
        }
      }
    }
    .transactions {
      margin-top: 13px;
      .more {
        height: 40px;
        width: 100%;
        background: #ffa72c;
        display: flex;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        a {
          color: #ffffff;
        }
      }
      ul {
        background: #fff;
        li {
          padding: 10px 8px;
          border-bottom: 1px solid #e1e1e1;
          color: #4a5970;
        }
      }
      .transaction-ul {
        font-family: Source Han Sans CN;
        img {
          height: 12px;
          width: 12px;
        }
        .label {
          font-size: 13px;
          font-weight: 500;
          color: #4a5970;
        }
        .status {
          font-size: 11px;
          font-weight: 400;
          color: #20e5ff;
          margin-left: 10px;
        }
        .fee {
          width: 215px;
          height: 18px;
          background: #f2f3f7;
          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
