<template>
  <div class="nav-con">
    <div class="nav-top pt-5 pb-5 flex between ">
      <div class="top_box">
        <div class="left flex">
          <img
            v-if="
              $route.name === 'home' ||
                $route.name === 'crossChain' ||
                $route.name === 'DAO' ||
                $route.name === 'exchangeList'
            "
            class="category flex center"
            src="@/assets/images/home/new/nav_header_menu.png"
            alt
            @click="toggleMenu"
          />
          <img
            v-else
            class="back"
            src="@/assets/images/common/back.png"
            alt=""
            @click="back"
          />
          <img class="logo" src="@/assets/images/home/new/nav_header_logo.png" alt="" />
          <!-- <div
            class="sel"
            @click="handleChange"
            v-if="$route.name === 'crossChain'"
          >
            {{ currencyKind }}
            <img src="@/assets/images/common/down.png" alt="" />
          </div> -->
          <div class="bi" v-if="isFlag">
            <div @click="handleChangeBi('BSC')">BSC</div>
            <div @click="handleChangeBi('MTC')">MTC</div>
          </div>
        </div>
        <div class="right">
          <div class="search" @click="init">
            <div class="account">{{ account }}</div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false" class="overlay">
      <div class="sidebar">
        <div class="sidebar-box">
          <img
            class="img"
            src="@/assets/images/common/meta.png"
            alt=""
            @click="goTo"
          />
          <div class="title">META SWAP</div>
          <div class="cell">
            <van-cell is-link>
              <template #title>
                <div class="flex">
                  <img src="@/assets/images/common/Home@2x.png" alt="" />
                  <span class="custom-title">{{ $t("common.Home") }}</span>
                </div>
              </template>
            </van-cell>
            <van-cell is-link>
              <template #title>
                <div class="flex">
                  <img src="@/assets/images/common/gongGao.png" alt="" />
                  <span class="custom-title">{{ $t("common.Notice") }}</span>
                </div>
              </template>
            </van-cell>
            <van-cell is-link>
              <template #title>
                <div class="flex">
                  <img src="@/assets/images/common/zhengShu.png" alt="" />
                  <span class="custom-title">{{ $t("common.audit") }}</span>
                </div>
              </template>
            </van-cell>
          </div>
          <div class="foot">
            <div class="en" @click="setLang('en')">english</div>
            <div class="zn" @click="setLang('zh_CN')">繁體中文</div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { Cell, CellGroup, Overlay } from "vant";
import Web3 from "web3";
import bus from "@/components/bus";
// import { mapState } from "vuex";
export default {
  name: "nav-con",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Overlay.name]: Overlay,
  },
  data() {
    return {
      show: false,
      web3: null,
      currencyKind: "BSC",
      isFlag: false,
    };
  },
  watch: {},
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  methods: {
    async init() {
		console.log("click");
		console.log(this.web3);
      if (this.web3 == null) {
        await this.getWeb3Psc();
      }
    },
    // 首页菜单
    toggleMenu() {
      this.show = true;
    },
    // 设置语言
    setLang(value) {
      this.show = false;
      $utils.setLanguage(value);
    },
    goTo() {
      this.show = false;
      this.$router.push({ name: "META" });
    },
    back() {
      this.$router.go(-1);
    },
    handleChange() {
      this.isFlag = !this.isFlag;
    },
    handleChangeBi(type) {
      this.currencyKind = type;
      this.isFlag = false;
      bus.$emit("change_bi", type);
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
		  console.log("ha");
        web3Provider = new Web3.providers.HttpProvider(
          // "https://rinkeby.infura.io/v3/5a05b8bc08234c6593e658462cedf995"
          "HTTP://localhost:7545"
        );
      }
      const web3 = new Web3(web3Provider); //web3js就是你需要的web3实例
      this.web3 = web3;
      const acc = await this.web3.eth.getAccounts();
      // this.account = acc[0];
      this.$store.commit("setAccount", acc[0]);
	  // 设置一个监控
	  
      // this.$store.state.account = acc;
      // if(acc){
      //    this.account = acc[0];
      // }else {
      //   this.account = '连接地址'
      // }

      // this.CreatePool();
      return web3;
    },
  },
};
</script>
<style lang="less">
.nav-con {
  height: 45px;
  transform: translateZ(0);
  position: fixed;
  width: 375px;
  z-index: 100;
  left: 50%;
  margin-left: -187.5px;
  top: 0;
  z-index: 1000;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 100vh;
  }
  .sidebar {
    // position: fixed;
    // top: 0;
    // left: 0;
    // background: rgba(0, 0, 0, 0.2);
    // height: 100vh;
    width: 100%;
    .sidebar-box {
      background: url("~@/assets/images/common/sidebar.png") no-repeat center
        center;
      background-size: 100% 100%;
      width: 247px;
      height: 572px;
      // position: relative;
      .img {
        height: 60px;
        width: 60px;
        margin-left: 26px;
        margin-top: 31px;
      }
      .title {
        font-size: 22px;
        font-weight: 400;
        color: #000000;
        line-height: 15px;
        margin-left: 26px;
        margin-top: 15px;
      }
      .cell {
        margin: 0 21px;
        .van-cell {
          background: transparent;
          padding: 0;
          padding-top: 24px;
          .van-icon {
            font-weight: 600;
            color: #333333;
          }
          img {
            height: 21px;
            width: 21px;
            vertical-align: middle;
          }
          .custom-title {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #333333;
          }
        }
        .van-cell:not(:last-child)::after {
          border: none;
        }
      }
      .foot {
        display: flex;
        align-items: center;
        text-align: center;
        line-height: 25px;
        margin-top: 240px;
        font-size: 13px;
        margin-left: 31px;
        > div {
          width: 55px;
          height: 25px;
        }
        .en {
          background: url("~@/assets/images/common/EN.png") no-repeat center
            center;
          background-size: 100% 100%;
          color: #ffffff;
        }
        .zn {
          background: url("~@/assets/images/common/ZN.png") no-repeat center
            center;
          background-size: 100% 100%;

          color: #66718d;
        }
      }
    }
  }
  .top_box {
    background: url("~@/assets/images/home/new/nav_header_bg.png") no-repeat center center;
    background-size: 100% 100%;
    height: 45px;
    display: flex;
    align-items: center;
    position: absolute;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    .back {
      height: 26px;
      width: 16px;
      margin-left: 11px;
      margin-right: 10px;
    }
    .category {
      width: 27px;
      height: 23px;
      margin-left: 11px;
      margin-right: 5px;
      margin-top: 3px;
    }
    .logo {
      width: 148px;
      height: 29px;
    }
    .sel {
      background: url("~@/assets/images/common/sel.png") no-repeat center center;
      background-size: 100% 100%;
      width: 55px;
      height: 29px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      color: #ffffff;
      margin-left: 15px;
      img {
        width: 6px;
        height: 4px;
        margin-left: 8px;
      }
    }
    .left {
      position: relative;
    }
    .bi {
      background: url("~@/assets/images/common/list.png") no-repeat center
        center;
      background-size: 100% 100%;
      width: 55px;
      // height: 40px;
      position: absolute;
      top: 35px;
      right: 0;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: bold;
      color: #32394d;
      line-height: 19px;
    }
    .right {
    }
    .search {
      background: url("~@/assets/images/home/new/nav_header_right_wallet.png") no-repeat center
        center;
      background-size: 100% 100%;
      width: 94px;
      height: 29px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      font-size: 12px;
      font-weight: 500;
      color: #FFFFFF;
      
      > div {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 4px;
        text-align: center;
      }
    }
    // /deep/.van-dropdown-menu {
    //   width: 75px;
    //   height: 29px;
    //   border-radius: 4px;

    //   .van-dropdown-menu__bar {
    //     height: 29px;
    //   }
    // }
    // /deep/.van-dropdown-item__content {
    //   width: 75px;
    // }
    // /deep/.van-popup--top {
    //   left: unset;
    //   right: 46px;
    // }
    // /deep/.van-overlay {
    //   background: rgba(0, 0, 0, 0.1);
    // }
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
