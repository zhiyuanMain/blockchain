<template>
  <div class="exchange-list">
    <div class="banner">
      <h2>{{ $t("exchange.exChange") }}</h2>
    </div>
    <div class="main">
      <div class="tab">
        <div class="flex tab-top">
          <div
            :class="[isActive ? 'activeTab1' : 'inActive1', 'btn1']"
            @click="tab(1)"
          >
            {{ $t("exchange.tab1") }}
          </div>
          <div
            :class="[isInActive ? 'activeTab2' : 'inActive2', 'btn2']"
            @click="tab(2)"
          >
            {{ $t("exchange.tab2") }}
          </div>
        </div>
        <!-- tab里面的内容 -->
        <div class="tab-content">
          <ul v-if="isActive">
            <li
              @click="goTo(item.address)"
              v-for="(item, i) in listByVolume"
              :key="i"
            >
              <div class="flex between">
                <div class="flex center-v">
                  <img
                    class="img1"
                    :src="require(`@/assets/images/exchange/item-icon-${item.name.toLowerCase()}.png`)"
                    :onerror="defaultImg"
                    alt=""
                  />
                  <span class="FRD fw-600">{{ item.name.toUpperCase() }}</span>
                  <span class="USDT">/USDT</span>
                </div>
                <div class="value">{{ item.total2 }}</div>
              </div>
              <div class="flex between mt-5">
                <div class="flex center-v">
                  <img
                    class="img2"
                    src="@/assets/images/exchange/item-icon-cursor.png"
                    alt=""
                  />
                  <span class="num">24H額 {{ item.volume }}</span>
                </div>
                <div class="price">${{ item.total1 }}</div>
              </div>
            </li>
          </ul>
          <ul v-else>
            <li
              @click="goTo(item.address)"
              v-for="(item, i) in listByPrice"
              :key="i"
            >
              <div class="flex between">
                <div class="flex center-v">
                  <!-- <van-image
                    class="img1"
                    :src="require(`@/assets/images/change/${item.name}.png`)"
                  >
                    <template v-slot:error
                      ><img
                        :src="
                          require('../../assets/images/change/defaultIcon.png')
                        "
                        alt=""
                    /></template>
                  </van-image> -->
                  <img
                    class="img1"
                    :src="require(`@/assets/images/exchange/item-icon-${item.name.toLowerCase()}.png`)"
                    :onerror="defaultImg"
                    alt=""
                  />
                  <span class="FRD fw-600">{{ item.name.toUpperCase() }}</span>
                  <span class="USDT">/USDT</span>
                </div>
                <div class="value">{{ item.price2 }}</div>
              </div>
              <div class="flex between mt-5">
                <div class="flex center-v">
                  <img
                    class="img2"
                    src="@/assets/images/change/shouShi.png"
                    alt=""
                  />
                  <span class="num">24H額 {{ item.volume }}</span>
                </div>
                <div class="price red">${{ item.price1 }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import BEP20 from "@/assets/contracts/BEP20.json";
import MetaSwap from "@/assets/contracts/MetaSwap.json";
import global from "../common.vue";
import { Toast } from "vant";

const mockData = ['mtc', 'tts1', 'drd', 'ftd', 'frd']

export default {
  name: "home",
  data() {
    return {
      value: 0,
      isActive: true,
      isInActive: false,
      poolData: [],
      listByVolume: [],
      listByPrice: [],
      web3: null,
      MetaSwapAddress: global.MetaSwapAddress,
      MetaSwapInstance: null,
      account: "",
    };
  },
  components: {
    [Toast.name]: Toast,
  },

  computed: {
    defaultImg() {
      return (
        'this.src="' +
        require("../../assets/images/change/defaultIcon.png") +
        '"'
      );
    },
  },
  mounted() {
    this.init();
    this.getList1();
  },

  methods: {
    async getList2() {
      const res = await this.$api({
        url: "/w3j/swap/events/listprice",
        header: {
          "X-Requested-With": "XMLhttprequest",
        },
      });
      for (var i = 0; i < res.data.length; i++) {
        let data = res.data[i];
        let address = data.address.toLowerCase();
        for (var j = 0; j < this.listByPrice.length; j++) {
          let pool = this.listByPrice[j];
          console.log("address");
          console.log(address);
          console.log(pool.address == address);
          if (pool.address.toLowerCase() == address.toLowerCase()) {
            this.listByPrice[j].volume = this.fromWei(String(data.volume));
            this.listByPrice[j].price1 = this.fromWei(String(data.price1));
            this.listByPrice[j].price2 = this.fromWei(String(data.price2));
          }
        }
      }
      // todo:
      /* this.listByPrice = mockData.map(str => {
        return {
          name: str,
          address: "0xf3b78906a81e327b3671699b34fc2823907070a2",
          price1: 0,
          price2: 0,
          volume: 0,
        }
      }) */
    },
    async getList1() {
      const res = await this.$api({
        url: "/w3j/swap/events/listamount",
        header: {
          "X-Requested-With": "XMLhttprequest",
        },
      });
      for (var i = 0; i < res.data.length; i++) {
        let data = res.data[i];
        let address = data.address.toLowerCase();
        for (var j = 0; j < this.listByVolume.length; j++) {
          let pool = this.listByVolume[j];
          if (pool.address.toLowerCase() == address.toLowerCase()) {
            this.listByVolume[j].volume = this.fromWei(String(data.volume));
            this.listByVolume[j].total1 = this.fromWei(String(data.total1));
            this.listByVolume[j].total2 = this.fromWei(String(data.total2));
          }
        }
      }
      console.log(res.data);
      // todo:
      /* this.listByVolume = mockData.map(str => {
        return {
          name: str,
          address: "0xf3b78906a81e327b3671699b34fc2823907070a2",
          total1: 0,
          total2: 0,
          volume: 0,
        }
      }) */
    },
    tab(type) {
      if (type === 1) {
        this.isActive = true;
        this.isInActive = false;
        this.getList1();
      } else {
        this.isActive = false;
        this.isInActive = true;
        this.getList2();
      }
    },
    async init() {
      // todo
      if (this.web3 == null) {
        await this.getWeb3Psc();
      }
      await this.getAllPools();
    },

    async getAllPools() {
      let _this = this;
      if (this.web3 == null) {
        await this.getWeb3Psc();
      }
      let meta = this.MetaSwapInstance;
      let list = await meta.methods.allSwapPools().call(
        {
          from: this.account,
        },
        function(err, res) {
          if (err) {
			console.error('allswappools',err,res)
            Toast.fail("查询失败交易对失败");
            return;
          }
		  console.log('getAllPools',res)
          _this.poolData = _this.poolsToData(res);
        }
      );
    },
    async poolsToData(list) {
      console.log(111111)
      let pools = [];
      for (var i = 0; i < list.length; i++) {
        let t = list[i];
        let tokenAddress = t.tokenAddress;
        let token = this.createInstance(tokenAddress, BEP20);
        let name = await token.methods.symbol().call({
          from: this.account,
        });
        pools.push({
          name: name,
          address: tokenAddress,
        });
      }
      for (var i = 0; i < pools.length; i++) {
        let pool = pools[i];
        this.listByVolume.push({
          name: pool.name,
          address: pool.address,
          volume: 0,
          total1: 0,
          total2: 0,
        });
        this.listByPrice.push({
          name: pool.name,
          address: pool.address,
          volume: 0,
          price1: 0,
          price2: 0,
        });
      }
	  console.log('poolsToData',this.listByVolume,this.listByPrice)
    },
    goTo(address) {
      this.$router.push({
        name: "exchange",
        query: {
          address: address,
        },
      });
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
          "HTTP://localhost:7545"
        );
      }
      const web3 = new Web3(web3Provider); //web3js就是你需要的web3实例
      this.web3 = web3;
      console.log("this.MetaSwapAddress");
      console.log(this.MetaSwapAddress);
      this.MetaSwapInstance = await this.createInstance(
        this.MetaSwapAddress,
        MetaSwap
      );
      const acc = await this.web3.eth.getAccounts();
      this.account = acc[0];
      // 全局
      this.$store.commit("setAccount", this.account);
      // this.CreatePool();
      return web3;
    },
    createInstance(address, contractData) {
      return new this.web3.eth.Contract(contractData, address);
    },
    toWei(value) {
      return Web3.utils.toWei(String(value), "ether");
    },
    fromWei(value) {
      return Web3.utils.fromWei(value, "ether");
    },
  },
};
</script>
<style lang="less">
.exchange-list {
  min-height: 100vh;
  padding-bottom: 50px;
  margin-bottom: 30px;

  // margin-bottom: 30px;
  .banner {
    // background: url("~@/assets/images/crossChain/banner.png") no-repeat center
    //   center;
    // background-size: 100% 100%;
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
    // background: url("~@/assets/images/crossChain/crossChain_01.png") no-repeat
    //   center center;
    // background-size: 100% 100%;
    background-color: #28344C;
    border-radius: 10px;
    // opacity: 0.8;
    min-height: 682px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 16px 15px;

    .tab {
      font-size: 13px;
      font-weight: bold;

      .tab-top {
        justify-content: space-between;
        > div {
          height: 37px;
          width: calc(50% - 9px);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .btn1 {
        background: url("~@/assets/images/exchange/btn_bg1.png") no-repeat
          center center;
        background-size: 100% 100%;
        color: #ffffff;
      }

      .btn2 {
        background: url("~@/assets/images/exchange/btn_bg2.png") no-repeat
          center center;
        background-size: 100% 100%;
        color: #ffffff;
      }

      // .inActive1 {
      //   background: url("~@/assets/images/change/list_tab4.png") no-repeat
      //     center center;
      //   background-size: 100% 100%;
      //   color: #1e202d;
      // }

      // .inActive2 {
      //   background: url("~@/assets/images/change/list_tab2.png") no-repeat
      //     center center;
      //   background-size: 100% 100%;
      //   color: #1e202d;
      // }

      .tab-content {
        ul {
          li {
            background: #1e2637;
            padding: 12px 8px;
            margin-top: 9px;
            font-size: 13px;
            border-radius: 4px;
            border: 1px solid #15618c;
            color: #fff;

            .img1 {
              height: 20px;
              width: 20px;
              margin-right: 4px;
            }

            .img2 {
              height: 14px;
              width: 14px;
              margin-left: 3px;
              margin-right: 8px;
            }

            .FRD {
              color: #fff;
              font-weight: bold;
            }

            .USDT {
              color: #96A4C7;
              font-weight: bold;
            }

            .num {
              color: #8D92A9;
              font-size: 10px;
            }

            .value {
              color: #96A4C7;
            }

            .price {
              font-size: 10px;
              color: #8D92A9;
            }

            .red {
              background: #C19E07;
              border-radius: 4px;
              padding: 0px 6px;
              line-height: 14px;
              color: #fff;
            }

            .green {
              background: #0ec887;
              border-radius: 7px;
              padding: 4px 6px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
