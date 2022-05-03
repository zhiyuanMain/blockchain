<template>
  <div class="crossChain">
    <div class="banner">
      <div class="wrapper">
      		<h2>{{ $t("crossChain.title") }}</h2>
          <!-- 屏蔽一些功能 -->
      		<!-- <a href="https://faucet-smart.metaswap.im/">
      		  <img src="@/assets/images/crossChain/engomtc.png" alt=""  v-if="lang == 'en'" >
      		  <img src="@/assets/images/crossChain/gomtc.png" alt=""  v-else >
      		</a> -->
		</div>
    </div>
    <div class="main">
      <div class="flex right mb-5">
        <img
          style="height:18px;width:18px;margin-right:8px"
          src="@/assets/images/crossChain/consult.png"
          alt=""
        />
        <img
          style="height:18px;width:18px"
          src="@/assets/images/crossChain/wenHao.png"
          alt=""
        />
      </div>
      <div>
        <div class="item_list flex between center-v">
          <div class="currency_left flex center-v between">
            <div class="flex">
              <cp-btn>
                <img
                  class="currency_img"
                  src="@/assets/images/crossChain/crossChain_03.png"
                  alt=""
                />
                <div>
                  <div class="currency_usdt">USDT</div>
                  <!-- <div class="currency_bsc">{{ BSC }}</div> -->
                  <div class="currency_bsc" v-show="network == 'bsc'">BSC</div>
                  <div class="currency_bsc" v-show="network == 'mtc'">MTC</div>
                </div>
              </cp-btn>
            </div>
            <!-- <img
              class="down flex right"
              src="@/assets/images/crossChain/down.png"
              alt=""
            /> -->
          </div>
          <div class="currency_right">
            <div class="balance">
              {{ $t("crossChain.balance") }}：{{ balance }}
            </div>
            <div class="inp mt-5 mb-5">
              <input type="text" v-model="input" />
            </div>
            <div class="least">{{ $t("crossChain.least") }}{{ minimum }}</div>
          </div>
        </div>

        <div class="up-to-down" @click="upDown()">
          <img src="@/assets/images/crossChain/up-to-down.png" alt="" />
        </div>
        <div class="item_list item_list_c2">
          <div class=" flex between center-v">
            <div class="currency_left flex center-v between">
              <div class="flex">
                 <cp-btn type="warn">
                  <img
                    class="currency_img"
                    src="@/assets/images/crossChain/crossChain_03.png"
                    alt=""
                  />
                  <div>
                    <div class="currency_usdt">USDT</div>
                    <!-- <div class="currency_bsc">{{ MTC }}</div> -->
                    <div class="currency_bsc" v-show="network == 'mtc'">BSC</div>
                    <div class="currency_bsc" v-show="network == 'bsc'">MTC</div>
                  </div>
                </cp-btn>
              </div>
              <!-- <img
                class="down flex right"
                src="@/assets/images/crossChain/down.png"
                alt=""
              /> -->
            </div>
            <div class="currency_right">
              <div class="balance">{{ $t("crossChain.Expected") }}</div>
              <div class="fs-18" style="color: #fff;margin-top:13px;font-weight:bold">
                {{ EstimatedQuantity }}
              </div>
            </div>
          </div>
          <div class="addr flex between center-v">
            <input
              type="text"
              v-model="receipt"
              :placeholder="$t('crossChain.input')"
              class="pl-10"
            />
            <div class="wallet flex" @click="wallet">
              <span>{{ $t("crossChain.wallet") }}</span>
              <van-icon name="arrow-down" />
            </div>
          </div>
        </div>
      </div>
      <!-- 确认 -->
      <div class="confirm" @click.stop="transferAndNotice">
        {{ $t("crossChain.confirm") }}
      </div>
      <div class="cost">
        <div class="flex between">
          <span>{{ $t("crossChain.path") }}</span>
          <span class="cost__value">SWAP</span>
        </div>
        <div class="flex between">
          <span>{{ $t("crossChain.Service") }}</span>
          <div class="flex center-v">
            <span id="span" class="cost__value">1USDT=1.00 USDT</span>
            <img src="@/assets/images/crossChain/integral.png" alt="" />
          </div>
        </div>
        <div class="flex between">
          <span>{{ $t("crossChain.Reference") }}</span>
          <span class="cost__value">0 USDT</span>
        </div>
        <div class="flex between">
          <span>{{ $t("crossChain.Estimated") }}</span>
          <span class="cost__value">{{ EstimatedQuantity }}</span>
        </div>
        <div class="flex between">
          <span>{{ $t("crossChain.Maximum") }}</span>
          <span class="cost__value">{{ maximum }} USDT</span>
        </div>
      </div>
      <!-- 兑换记录 -->
      <div class="exchange-record mt-20 mb-30">
        <div class="flex between mb-5">
          <div class="title">{{ $t("exchange.exchange-record") }}</div>
          <div class="img-top">
            <img
              class="mr-25"
              src="@/assets/images/change/clear.png"
              alt=""
              @click="deleteChange(1)"
            />
            <img
              src="@/assets/images/change/update.png"
              alt=""
              @click="upChange(1)"
            />
          </div>
        </div>
        <div
          class="flex pl-10 pr-10 exchange-record-box between"
          v-for="(item, i) in logs"
          :key="i"
        >
          <div>
            <div class="top">
              <span> {{ item.createTime | toDate }} </span
              ><span class="ml-10">{{ $t("exchange.success") }}</span>
            </div>
            <div class="center-box" v-if="item.ctype == 'mtc'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >MTC USDT</span
              >
            </div>
            <div class="center-box" v-if="item.ctype == 'bsc'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >BSC USDT</span
              >
            </div>
            <div class="bottom">{{ item.value }}</div>
          </div>
          <img
            class="leftToRight"
            src="@/assets/images/change/right.png"
            alt=""
          />
          <div>
            <div class="top flex right">{{ item.hash | short }}</div>
            <div class="center-box flex right" v-if="item.ctype == 'mtc'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >BSC USDT</span
              >
            </div>
            <div class="center-box flex right" v-if="item.ctype == 'bsc'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >MTC USDT</span
              >
            </div>
            <div class="bottom flex right">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import global from "../common.vue";
import BEP20 from "@/assets/contracts/BEP20.json";
import Web3 from "web3";
import bus from "@/components/bus";
let moment = require("moment");
import { Tab, Tabs, Button, Icon, Toast } from "vant";
import CpBtn from '../../components/cp-btn.vue';
export default {
  name: "home",
  data() {
    return {
      input: 100,
      web3: null,
      // 切换时更新network字段：bsc or mtc
      network: "bsc",
      BSC_USDTAddress: global.BSC_USDTAddress,
      MTC_USDTAddress: global.MTC_USDTAddress,
      TO_BSC_Address: global.RECEIVE_BSC,
      TO_MTC_Address: global.RECEIVE_MTC,
      CROSS_SERVER: global.CROSS_SERVER,
      account: null,
      balance: 0,
      receipt: "",
      logs: [],
      upToDown: false,
      switching: false,
      EstimatedQuantity: 0.0,
      maximum: 10000,
      minimum: 100,
	  lang:'',
	  isWorkTime: false
      // BSC: "BSC",
      // MTC: "MTC",
    };
  },
  components: {
    CpBtn,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },

  computed: {
    // 产品列表数据
  },
  mounted() {
	let d = new Date();
	let h = d.getHours();
	if (h >= 9 && h < 22) {
		this.isWorkTime = true;
	}
	this.lang = this._i18n.locale;
    this.input = this.input.toFixed(2);
    this.getBalance();
    bus.$on("change_bi", (res) => {
      console.log(res);
      // this.BSC = res;
      // // this.upToDown = !this.upToDown
      // if (res === "MTC") {
      //   this.MTC = "BSC";
      // } else {
      //   this.MTC = "MTC";
      // }
      if (res === "MTC") {
        this.upToDown = true;
        this.network = "mtc";
      } else {
        this.upToDown = false;
        this.network = "bsc";
      }
      console.log(this.network);

      this.getBalance();
    });
  },
  filters: {
    short: function(value) {
      return value.substr(0, 6) + "..." + value.substr(-4);
    },
    toDate: function(value) {
      return moment(new Date(value)).format("MM-DD HH:mm");
    },
  },
  watch: {
    input(val) {
      let value = Number(val);
      if (value < this.minimum) {
        Toast.fail(`最小兑换量为${this.minimum}`);
      } else if (value > this.maximum) {
        Toast.fail(`最大兑换量不能超过${this.maximum}`);
        this.EstimatedQuantity = this.maximum;
        this.input = this.maximum.toFixed(2);
        console;
      } else {
        console.log(typeof value, value);
        // this.EstimatedQuantity = (value - (value * 0.01 + 1)).toFixed(2);
        this.EstimatedQuantity = value;
        console.log(" this.EstimatedQuantity", this.EstimatedQuantity);
      }
    },
  },
  methods: {
    wallet() {
      if (this.account != null) {
        this.receipt = this.account;
      }
    },
	workTimeTips() {
		Toast.fail(this.$t("crossChain.worktime"))
		return;
	},
    async upDown() {
      Toast.fail("请在钱包中切换网络！！！");
      return;
      // if (this.BSC === "MTC") {
      //   this.MTC = "MTC";
      //   this.BSC = "BSC";
      // } else {
      //   console.log(111);
      //   this.MTC = "BSC";
      //   this.BSC = "MTC";
      // }
      this.upToDown = !this.upToDown;
      // this.network = this.network == "bsc" ? "mtc" : "bsc";
      console.log(this.network);
      await this.getBalance();
    },
    async getList() {
      const res = await this.$api({
        url: "/chain-blocks",
        method: "get",
        header: {
          "X-Requested-With": "XMLhttprequest",
        },
      });
      console.log(res);
    },
    // 获取余额
    async getBalance() {
      if (this.web3 == null) {
        await this.getWeb3Psc();
      }
      let _this = this;
      this.balance = 0;
      if (this.network == "bsc") {
        console.log("this.BSC_USDTAddress");
        console.log(this.BSC_USDTAddress);
        let ins = this.createInstance(this.BSC_USDTAddress, BEP20);
        await ins.methods.balanceOf(this.account).call(
          {
            from: this.account,
          },
          function(err, res) {
            if (err) {
              Toast.fail("请检查钱包链接的是不是BSC网络");
              return;
            }
            _this.balance = _this.format(_this.fromWei(res), "0.000001");
          }
        );
      } else {
        let ins = this.createInstance(this.MTC_USDTAddress, BEP20);
        await ins.methods.balanceOf(this.account).call(
          {
            from: this.account,
          },
          function(err, res) {
            if (err) {
              Toast.fail("请检查钱包链接的是不是MTC网络");
              return;
            }
            _this.balance = _this.format(_this.fromWei(res), "0.000001");
          }
        );
      }
    },
    // 转账并通知接口
    async transferAndNotice() {
      let _this = this;
      if (_this.receipt == "") {
        Toast.fail("接收地址不能为空");
        return;
      }
      if (Number(this.input) < this.minimum) {
        Toast.fail(`单次最大兑换量不能小于${this.minimum}`);
        return;
      }
      if (Number(this.input) > this.maximum) {
        Toast.fail(`单次最大兑换量不能超过${this.maximum}`);
        return;
      }
      if (this.network == "bsc") {
        let ins = this.createInstance(this.BSC_USDTAddress, BEP20);
        console.log(ins);
        console.log(this.TO_BSC_Address);
        console.log(this.toWei(this.input));
        console.log(this.account);

        await ins.methods
          .transfer(this.TO_BSC_Address, this.toWei(this.input))
          .send(
            {
              from: this.account,
              to: this.TO_BSC_Address,
            },
            function(err, res) {
              if (err) {
                Toast.fail("请检查钱包链接的是不是BSC网络" + err.data.name);
                return;
              } else {
                Toast.success("处理中");
                console.log("res");
                console.log(res);
                _this.getTransactionReceipt(res);
                // 应在此处构建log
              }
            }
          )
          .on("transactionHash", function(hash) {
            // 放入记录
            let log = {
              status: null,
              from: _this.account,
              hash: hash,
              value: _this.input,
              createTime: Date.now(),
              ctype: _this.network,
            };
            _this.addLog(log);
          })
          .on("receipt", function(receipt) {
            // TODO 根据receipt更新logs状态
            console.log("receipt");
            console.log(receipt);
            let returnValues = receipt.events.Transfer.returnValues;
            let log = {
              status: receipt.status,
              from: receipt.from,
              hash: receipt.transactionHash,
              value: _this.fromWei(returnValues.value),
              createTime: Date.now(),
              ctype: _this.network,
            };
            _this.updateLog(log);
            // _this.logs.unshift(log);
            // TODO 保存缓存 store[this.account].unshift(log)
            // 推送数据
            if (receipt.status) {
              _this.push(
                receipt.from,
                _this.receipt,
                returnValues.value,
                receipt.transactionHash
              );
            }
          });
      } else {
		  if(!this.isWorkTime) {
			  this.workTimeTips();
			  return;
		  }
        let ins = this.createInstance(this.MTC_USDTAddress, BEP20);
        await ins.methods
          .transfer(this.TO_MTC_Address, this.toWei(this.input))
          .send(
            {
              from: this.account,
              to: this.TO_MTC_Address,
            },
            function(err, res) {
              if (err) {
                Toast.fail("请检查钱包链接的是不是MTC网络" + err.data.name);
                return;
              } else {
                Toast.success("处理中");
                console.log("res");
                console.log(res);
              }
            }
          )
          .on("transactionHash", function(hash) {
            // 放入记录
            let log = {
              status: null,
              from: _this.account,
              hash: hash,
              value: _this.input,
              createTime: Date.now(),
              ctype: _this.network,
            };
            _this.addLog(log);
          })
          .on("receipt", function(receipt) {
            console.log("receipt");
            console.log(receipt);
            let returnValues = receipt.events.Transfer.returnValues;
            let log = {
              status: receipt.status,
              from: receipt.from,
              hash: receipt.transactionHash,
              value: _this.fromWei(returnValues.value),
              createTime: Date.now(),
              ctype: _this.network,
            };
            _this.updateLog(log);
            // _this.logs.unshift(log);
            // TODO 保存缓存 store[this.account].unshift(log)
            // 推送数据
            if (receipt.status) {
              _this.push(
                receipt.from,
                _this.receipt,
                returnValues.value,
                receipt.transactionHash
              );
            }
          });
      }
      // 更新一下錢包
      this.getBalance();
    },
    addLog(log) {
      let found = false;
      for (var i = 0; i < this.logs.length; i++) {
        if (this.logs[i].hash == log.hash) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.logs.unshift(log);
        this.save();
      }
      console.log("thislogs");
      console.log(this.logs);
    },
    updateLog(log) {
      let found = false;
      for (var i = 0; i < this.logs.length; i++) {
        if (this.logs[i].hash == log.hash) {
          this.logs[i] = log;
          found = true;
          break;
        }
      }
      if (!found) {
        this.logs.unshift(log);
      }
      this.save();
    },
    // 保存
    save() {
      localStorage.setItem(`${this.account}_token`, JSON.stringify(this.logs));
    },
    // 更新兑换记录
    upChange(type) {
      console.log(
        "缓存",
        JSON.parse(localStorage.getItem(`${this.account}_token`))
      );
      this.logs = JSON.parse(localStorage.getItem(`${this.account}_token`));
      this.logs = this.logs == null ? [] : this.logs;
      if (type === 1) {
        Toast("更新完成");
      }
    },
    deleteChange() {
      localStorage.removeItem(`${this.account}_token`);
      this.logs = [];
      Toast("删除成功");
    },
    // 推送
    async push(from, to, value, hash) {
      console.log("push方法", to);
      let url = "";
      if (this.network == "bsc") {
        url +=
          "/userSendFrombsc?user=" +
          from +
          "&hash=" +
          hash +
          "&toaddress=" +
          to +
          "&amount=" +
          value;
      } else {
        url +=
          "/userSendFrommtc?user=" +
          from +
          "&hash=" +
          hash +
          "&toaddress=" +
          to +
          "&amount=" +
          value;
      }
      // TODO 请求url
      console.log("url", url);
      const res = await this.$api({
        url: url,
        method: "get",
        header: { "X-Requested-With": "XMLhttprequest" },
      });
      console.log("tuisong", res);
      if (res.data === "ok") {
        Toast("推送成功");
      }
    },

    createInstance(address, contractData) {
      return new this.web3.eth.Contract(contractData, address);
    },
    // 根据hash查询交易凭证
    async getTransactionReceipt(hash) {
      var receipt = this.web3.eth
        .getTransactionReceipt(
          "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
        )
        .then(console.log);
      return receipt;
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
      const acc = await this.web3.eth.getAccounts();
      this.account = acc[0];
      //
      let id = await this.web3.eth.net.getId();
      if (id == "56") {
        this.network = "bsc";

        // this.upDown();
      } else if (id == "20028") {
        this.network = "mtc";
        // this.upDown();
      } else {
        Toast.fail("请连到正确的网络");
      }

      let _this = this;
      web3Provider.on("networkChanged", function(networkId) {
        switch (networkId) {
          // bsc
          case "56":
            console.log("56");
            _this.network = "bsc";
            _this.getBalance();
            // _this.upDown();
            break;
          // mtc
          case "20028":
            _this.network = "mtc";
            // _this.upDown();
            _this.getBalance();
            break;
          default:
            Toast.fail("请连到正确的网络");
        }
        console.log("networkChanged", networkId);
        console.log(" _this.network", _this.network);
      });
      console.log("id=");
      console.log(Web3.version);
      // 全局
      this.$store.commit("setAccount", this.account);
      this.upChange();
      return web3;
    },
    toWei(value) {
      return Web3.utils.toWei(String(value), "ether");
    },
    fromWei(value) {
      return Web3.utils.fromWei(value, "ether");
    },
    format(a, b) {
      if (b.indexOf(".") == -1) {
        if (a.indexOf(".") != -1) {
          return a.substr(0, a.indexOf("."));
        } else {
          return a;
        }
      } else {
        let l = b.substr(b.indexOf(".") + 1).length;
        if (a.indexOf(".") == -1) {
          return a.concat(".").concat("0".repeat(l));
        } else {
          let ll = a.substr(a.indexOf(".") + 1).length;
          if (ll > l) {
            return a.substr(0, a.indexOf(".") + l + 1);
          } else {
            return a.concat("0".repeat(l - ll));
          }
        }
      }
    },
  },
};
</script>
<style lang="less">
.crossChain {
  min-height: 100vh;
  padding-bottom: 50px;
  margin-bottom: 30px;

  .banner {
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
    min-height: 682px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 17px 8px;
    background-color: #28344C;
    border-radius: 10px;

    .item_list {
      background: #1e2637;
      padding: 14px 10px 23px;
      // margin-bottom: 12px;
      border-radius: 10px;
      &_c2 {
        margin-top: -10px;
        padding-top: 25px;
        padding-bottom: 15px;
      }

      .currency_left {
        width: 130px;
        height: 48px;
        border-radius: 6px;
        padding: 7px;
        color: #fff;

        .currency_img {
          height: 26px;
          width: 26px;
          margin-right: 8px;
        }

        .down {
          width: 10px;
          height: 6px;
        }

        .currency_usdt {
          font-size: 18px;
          font-weight: 500;
        }

        .currency_bsc {
          font-size: 11px;
          font-weight: 400;
          color: #fff;
          text-align: left;
        }

        .cp-btn-container {
          width: 139px;
          height: 59px;
          display: flex;
          // justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
        }
      }

      .currency_right {
        input {
          width: 130px;
          height: 32px;
          border: none;
          text-align: right;
          font-size: 18px;
          padding: 0 5px;
          background: #2e374d;
          color: #fff;
          border-radius: 4px;
          font-weight: bold;
        }

        > div {
          text-align: right;
        }

        .balance {
          font-size: 11px;
          font-weight: 400;
          color: #fff;
        }

        .least {
          font-size: 10px;
          font-weight: 400;
          color: #96A4C7;
        }
      }

      .addr {
        height: 37px;
        margin: 16px 0 6px 0;
        background: #2e374d;
        border-radius: 6px;

        input {
          width: 180px;
          border: none;
          height: 36px;
          font-size: 12px;
          font-weight: bold;
          background: #2e374d;
          color: #fff;
        }

        .wallet {
          background: #bc9926;
          margin-right: 6px;
          color: #ffffff;
          font-size: 10px;
          padding: 8px;
          border-radius: 4px;
        }
      }
    }

    .up-to-down {
      height: 31px;
      width: 90%;
      margin: 0 auto;
      position: relative;

      img {
        display: block;
        height: 100%;
        width: 31px;
        margin: -10px auto;
      }
    }

    .confirm {
      background: url('~@/assets/images/crossChain/confirm.png') no-repeat;
      background-size: cover;
      width: 100%;
      height: 47px;
      line-height: 47px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      margin-top: 18px;
      margin-bottom: 18px;
      border-radius: 10px;
    }

    .cost {
      padding: 10px 4px 17px;
      border-radius: 10px;
      color: #fff;
      > div {
        margin-top: 14px;

        span:first-child {
          font-size: 11px;
          font-weight: 400;
        }

        span:last-child,
        #span {
          font-size: 12px;
          font-weight: 500;
        }

        img {
          height: 18px;
          width: 18px;
        }
      }

      &__value {
        font-weight: bolder;
      }
    }

    .exchange-record {
      border-radius: 10px;
      color: #fff;
      .title {
        font-size: 14px;
        font-weight: bold;
      }

      .exchange-record-box {
        background: #f2f3f7;
        border-radius: 4px;
        padding-top: 7px;
        padding-bottom: 7px;
      }

      .img-top {
        img {
          height: 15px;
          width: 15px;
        }
      }

      .top {
        font-size: 10px;
        font-weight: 400;
        color: #888888;
        line-height: 19px;
        margin-bottom: 7px;

        span:last-child {
          color: #22d3e5;
          font-size: 10px;
        }
      }

      .center-box {
        // margin-bottom: 8px;
        color: #555555;
        vertical-align: middle;
        display: flex;
        align-items: center;

        img {
          height: 18px;
          width: 18px;
        }

        span {
          font-size: 11px;
          color: #555555;
          line-height: 19px;
          margin-left: 3px;
        }
      }

      .bottom {
        font-size: 10px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #555555;
        line-height: 19px;
      }

      .leftToRight {
        width: 23px;
        height: 8px;
        margin-top: 24px;
      }
    }
  }
}
.wrapper {
	// margin: 74px 15px 0 15px;
	margin: 0 15px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.wrapper a {
	margin-top: 70px;
}
.wrapper a img {
	height: 33px;
}
</style>
