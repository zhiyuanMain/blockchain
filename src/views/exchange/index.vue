<template>
  <div class="exchange">
    <div class="banner">
      <!-- <div>
        <img
          class="banner-box"
          src="@/assets/images/crossChain/banner.png"
          alt=""
        />
      </div> -->
      <h2>{{ $t("exchange.exChange") }}</h2>
    </div>
    <div class="main">
      <div class="volume">
        <div class="volume_top">
          <div class="currency">{{ tokenInfo.symbol }} / USDT</div>
          <div>
            <div class="label">24H {{ $t("exchange.tab2") }}</div>
            <div class="value">
              {{ latestPriceU }} U / {{ latestPriceT }} {{ tokenInfo.symbol }}
            </div>
          </div>
        </div>
        <div class="chart">
          <div id="charts_box" style="height: 200px;width:100%"></div>
        </div>
      </div>
      <!--交易池 -->
      <div class="trade flex mb-15">
        <div class="trade_left">
          <div class="title mb-10">{{ $t("exchange.trade") }}</div>
          <ul>
            <li>
              <div class="flex">
                <div class="trade_img mt-10">
                  <img
                    v-if="tokenInfo.symbol"
                    class=""
                    :src="
                      require(`@/assets/images/change/${tokenInfo.symbol}.png`)
                    "
                    alt=""
                  />
                  <span class="ml-5"
                    >{{ tokenInfo.symbol }}{{ $t("exchange.num") }}</span
                  >
                  <div class="num mt-15 fw-700 fs-14">{{ tokenReserve }}</div>
                </div>
              </div>
            </li>
            <li>
              <div class="flex">
                <div class="trade_img mt-10">
                  <img
                    src="@/assets/images/change/icon_02.png"
                    alt=""
                    class=""
                  /><span class="ml-5">USDT{{ $t("exchange.num") }}</span>
                  <div class="num mt-15 fw-700 fs-14">{{ usdtReserve }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="trade_right">
          <div>
            <div class="img flex between center-h">
              <!-- 买入卖出 -->
              <div
                :class="[
                  isTabShow ? 'buy' : 'sale',
                  'img flex center-v center-h mr-10',
                ]"
                @click="tab('buy')"
              >
                <cp-btn>
                  {{ $t("exchange.buy") }}
                </cp-btn>
              </div>
              <div
                :class="[
                  isTabShow ? 'sale' : 'buy',
                  'img flex center-v center-h',
                ]"
                @click="tab('sale')"
              >
                <cp-btn type="warn">
                  {{ $t("exchange.sale") }}
                </cp-btn>
              </div>
            </div>
            <div class="flex between mt-10 wallet">
              <span>{{ $t("exchange.wallet") }}：</span
              ><span> {{ tokenBalance }} {{ tokenInfo.symbol }}</span>
            </div>
            <div class="jia">
              <img
                src="@/assets/images/change/jianHao.png"
                alt=""
                @click="tapChangeNumber('sub')"
              />
              <input
                type="number"
                v-model.number="value"
                @blur="valueChange($event)"
              />
              <img
                src="@/assets/images/change/jiaHao.png"
                class="mr-10"
                alt=""
                @click="tapChangeNumber('add')"
              />
            </div>
            <div class="flex between mt-10 wallet">
              <span>{{ $t("exchange.wallet") }}：</span
              ><span> {{ usdtBalance }} USDT</span>
            </div>
            <div class="jia estimate">
              <span class="ml-10">{{ $t("exchange.Turnover") }}</span>
              <span class="mr-10">{{ amountOfUSDT }} USDT</span>
            </div>
            <!-- 确认 -->
            <div class="submit mt-15 flex center" @click="operate">
              {{ $t("exchange.submit") }}
            </div>
          </div>
        </div>
      </div>
      <div class="FRD">
        <div class="title">{{ tokenInfo.symbol }}（{{ tokenInfo.name }}）</div>
        <ul>
          <li class="flex">
            <div>
              <div class="tit">{{ $t("exchange.Total") }}</div>
              <div class="num">420000</div>
              <div class="line"></div>
            </div>
            <div class="right_line"></div>
          </li>
          <li class="flex">
            <div>
              <div class="tit">{{ $t("exchange.Destroy") }}</div>
              <div class="num">220000</div>
              <div class="line"></div>
            </div>
            <div class="right_line"></div>
          </li>
          <li>
            <div>
              <div class="tit">{{ $t("exchange.circulation") }}</div>
              <div class="num">200000</div>
              <div class="line"></div>
            </div>
          </li>
          <li class="flex">
            <div>
              <div class="tit">{{ $t("exchange.mechanism") }}</div>
              <div class="num">5%{{ $t("exchange.extreme_deflation") }}</div>
            </div>
            <div class="right_line"></div>
          </li>
          <li class="flex">
            <div>
              <div class="tit">{{ $t("exchange.Exchange_amplitude") }}</div>
              <div class="num">{{ latestPriceT }}</div>
            </div>
            <div class="right_line"></div>
          </li>
          <li class="flex">
            <div>
              <div class="tit">{{ $t("exchange.Ecological_Application") }}</div>
              <div class="num">{{ $t("exchange.token") }}</div>
            </div>
            <!-- <div class="right_line"></div> -->
          </li>
        </ul>
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
              @click="deleteChange"
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
          v-for="(item, index) in logs"
          :key="index"
        >
          <div>
            <div class="top">
              <span>{{ item.createTime | toDate }} </span
              ><span class="ml-10">{{ $t("exchange.success") }}</span>
            </div>
            <div class="center-box" v-if="item.ctype == 'buy'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >USDT</span
              >
            </div>
            <div class="bottom" v-if="item.ctype == 'buy'">
              {{ item.usdtAmount }}
            </div>

            <div class="center-box" v-if="item.ctype == 'sale'">
              <img src="@/assets/images/change/icon_03.png" alt="" /><span>{{
                tokenInfo.symbol
              }}</span>
            </div>
            <div class="bottom" v-if="item.ctype == 'sale'">
              {{ item.tokenAmount }}
            </div>
          </div>
          <img
            class="leftToRight"
            src="@/assets/images/change/right.png"
            alt=""
          />
          <div>
            <div class="top flex right">{{ item.hash | short }}</div>
            <div class="center-box flex right" v-if="item.ctype == 'buy'">
              <img src="@/assets/images/change/icon_03.png" alt="" /><span>{{
                tokenInfo.symbol
              }}</span>
            </div>
            <div class="bottom flex right" v-if="item.ctype == 'buy'">
              {{ item.tokenAmount }}
            </div>

            <div class="center-box flex right" v-if="item.ctype == 'sale'">
              <img src="@/assets/images/change/icon_02.png" alt="" /><span
                >USDT</span
              >
            </div>
            <div class="bottom flex right" v-if="item.ctype == 'sale'">
              {{ item.usdtAmount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Web3 from "web3";
import BigNumber from "bignumber.js";
let moment = require("moment");

import global from "../common.vue";

import { Toast } from "vant";

import legend_img_1 from "../../assets/images/change/origin_fen.png";
import legend_img_2 from "../../assets/images/change/origin_shi.png";
import legend_img_3 from "../../assets/images/change/origin_ri.png";
import legend_img_4 from "../../assets/images/change/origin_yue.png";
import BEP20 from "@/assets/contracts/BEP20.json";
import MetaSwap from "@/assets/contracts/MetaSwap.json";
export default {
  components: {
    [Toast.name]: Toast,
  },
  name: "",
  data() {
    return {
      tokenAddress: "",
      tokenInfo: [],
      value: 0,
      buyValue: 0,
      saleValue: 0,
      curOp: "buy",
      BEP20USDTAddress: global.BEP20USDTAddress,
      MetaSwapInstance: null,
      MetaSwapAddress: global.MetaSwapAddress,
      tokenInstance: null,
      BEP20USDT: null,
      isTabShow: true,
      account: "", //钱包地址
      USDTValue: 0, //USDT钱包余额
      FRDValue: 0,
      amountOfUSDT: 0,
      amountOfUSDTIn: 0, //成交量
      amountOfUSDTOut: 0, //成交量
      tokenReserve: 0, // token数量
      usdtReserve: 0, // usdt数量
      tokenBalance: 0, // token余额
      usdtBalance: 0, // usdt余额
      lastClickTime: 0,
      timer: null,
      pool: [],
      latestPriceU: 0,
      latestPriceT: 0,
      latestPriceUMin: 0, // u最小增减值
      latestPriceTMin: 0, // token最小增减值
      maximum: 1000, //最大值
      maxBuy: 0, // 最大买
      maxSell: 0, // 最大卖
      logs: [],
      buyd4: [],
      buyh4: [],
      buym4: [],
      buyy4: [],
    };
  },
  mounted() {
	this.tokenAddress = this.$route.query.address;
    this.getChart();
    // this.getOption();
    this.getWeb3Psc();
    // console.log("缓存", JSON.parse(localStorage.getItem(this.account)));
    // this.logs = JSON.parse(localStorage.getItem(this.account));
  },
  filters: {
    short: function(value) {
      return value.substr(0, 6) + "..." + value.substr(-4);
    },
    toDate: function(value) {
      return moment(new Date(value)).format("MM-DD HH:mm");
    },
  },
  methods: {
    async getChart() {
      let buyd4Data = [],
        buyd4Time = [],
        buyh4Data = [],
        buyh4Time = [],
        buym4Data = [],
        buym4Time = [],
        buyy4Data = [],
        buyy4Time = [];
      const res = await this.$api({
        url: "/w3j/swap/events/kline",
		params:{address:this.tokenAddress},
        method: "get",
        header: { "X-Requested-With": "XMLhttprequest" },
      });
      if (res.status === 200) {
        res.data.buyd4.map((item) => {
          if ("amount" in item) {
            item.amount = Number(this.fromWei(String(item.amount)));
          } else {
            item.amount = 0;
          }
          buyd4Time.push(item.date);
          buyd4Data.push(item.amount);
        });
        res.data.buyh4.map((item) => {
          if ("amount" in item) {
            item.amount = Number(this.fromWei(String(item.amount)));
          } else {
            item.amount = 0;
          }
          buyh4Time.push(item.date);
          buyh4Data.push(item.amount);
        });
        res.data.buym4.map((item) => {
          if ("amount" in item) {
            item.amount = Number(this.fromWei(String(item.amount)));
          } else {
            item.amount = 0;
          }
          buym4Time.push(item.date);
          buym4Data.push(item.amount);
        });
        res.data.buyy4.map((item) => {
          if ("amount" in item) {
            item.amount = Number(this.fromWei(String(item.amount)));
          } else {
            item.amount = 0;
          }
          buyy4Time.push(item.date);
          buyy4Data.push(item.amount);
        });
      }
      console.log("-------", buyd4Time, buyd4Data);
      this.getOption(
        buyd4Data,
        buyd4Time,
        buyh4Data,
        buyh4Time,
        buym4Time,
        buym4Data,
        buyy4Time,
        buyy4Data
      );
    },
    // echarts
    getOption(
      buyd4Data,
      buyd4Time,
      buyh4Data,
      buyh4Time,
      buym4Time,
      buym4Data,
      buyy4Time,
      buyy4Data
    ) {
      var dom = document.getElementById("charts_box");
      var myChart = this.$echarts.init(dom);
      let option = {
        backgroundColor: '#1e2637',
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // data: ["分", "时", "日", "月"],
          right: 0,
          textStyle: {
            //图例文字的样式
            color: "#B3B3B3",
            fontSize: 10,
          },
          itemGap: 2,
          itemWidth: 10, //图标宽
          itemHeight: 10, //图标高
          data: [
            {
              name: "分",
              // 强制设置图形为圆。
              // icon: `image://${legend_img_1}`,
              icon: 'circle',
              // 设置文本为红色
              textStyle: {
                // color: "#fff",
                fontSize: 10,
              },
            },
            {
              name: "时",
              // 强制设置图形为圆。
              // icon: `image://${legend_img_2}`,
              icon: 'circle',
              // 设置文本为红色
              textStyle: {
                // color: "rgba(0, 0, 0, 0.85)",
                fontSize: 10,
              },
            },
            {
              name: "日",
              // 强制设置图形为圆。
              // icon: `image://${legend_img_3}`,
              icon: 'circle',
              // 设置文本为红色
              textStyle: {
                // color: "rgba(0, 0, 0, 0.85)",
                fontSize: 10,
              },
            },
            {
              name: "月",
              // 强制设置图形为圆。
              // icon: `image://${legend_img_4}`,
              icon: 'circle',
              // 设置文本为红色
              textStyle: {
                // color: "rgba(0, 0, 0, 0.85)",
                fontSize: 10,
              },
            },
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "20%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
          // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
          nameTextStyle: {
            color: '#fff'
          }
          // min: 0,
          // max: 9,
          // interval: 2,
          // splitNumber:5
        },
        series: [
          {
            name: "分",
            type: "line",
            itemStyle: {
              normal: {
                color: "#F96968",
                lineStyle: {
                  color: "#F96968",
                },
              },
            },
            data: buym4Data,
          },
          {
            name: "时",
            type: "line",
            itemStyle: {
              normal: {
                color: "#0080FF",
                lineStyle: {
                  color: "#0080FF",
                },
              },
            },
            data: buyh4Data,
          },
          {
            name: "日",
            type: "line",
            itemStyle: {
              normal: {
                color: "#36F7F4",
                lineStyle: {
                  color: "#36F7F4",
                },
              },
            },
            data: buyd4Data,
          },
          {
            name: "月",
            type: "line",
            itemStyle: {
              normal: {
                color: "#CACFD7",
                lineStyle: {
                  color: "#CACFD7",
                },
              },
            },
            data: buyy4Data,
          },
        ],
      };
      myChart.setOption(option, true);
    },
    // tab切换
    tab(op) {
	  console.log('tab',op)
      this.curOp = op;
      this.isTabShow = !this.isTabShow;
      if (op == "sale") {
        this.value = this.saleValue;
        this.amountOfUSDT = this.amountOfUSDTOut;
      } else {
        this.value = this.buyValue;
        this.amountOfUSDT = this.amountOfUSDTIn;
      }
    },
    // 加减功能
    tapChangeNumber(action) {
      let _this = this;
      switch (action) {
        case "add":
          this.value = new BigNumber(this.value).plus(this.latestPriceTMin);
          if (_this.timer != null) {
            clearTimeout(_this.timer);
          }
          if (this.curOp == "sale") {
            this.saleValue = this.value;
            _this.getAmountOfUSDTOut();
          } else {
            this.buyValue = this.value;
            _this.getAmountOfUSDTIn();
          }

          break;
        case "sub":
          if (this.value > 0) {
            this.value = new BigNumber(this.value).minus(this.latestPriceTMin);
          }
          if (_this.timer != null) {
            clearTimeout(_this.timer);
          }
          if (this.curOp == "sale") {
            this.saleValue = this.value;
            _this.getAmountOfUSDTOut();
          } else {
            this.buyValue = this.value;
            _this.getAmountOfUSDTIn();
          }
          break;
      }
    },
    // USDT钱包余额
    async walletUSDT() {
      // 查询东西都不用授权 传入钱包地址 然后用call 不用send
      let tokenInstance = await this.createInstance(
        this.BEP20USDTAddress,
        BEP20
      );
      await tokenInstance.methods
        .balanceOf(this.account)
        .call((error, result) => {
          console.log("usdt", result);
          this.USDTValue = this.fromWei(result);
          console.log(this.USDTValue);
        });
    },
    // 查询FRD余额
    async walletFRD() {
      // 查询东西都不用授权 传入钱包地址 然后用call 不用send
      let tokenInstance = await this.createInstance(
        this.tokenAddressFRD,
        BEP20
      );
      await tokenInstance.methods
        .balanceOf(this.account)
        .call((error, result) => {
          console.log("usdt", result);
          this.FRDValue = this.fromWei(result);
          console.log(this.FRDValue);
        });
    },
    valueChange(e) {
      let _this = this;
      let v = e.target.value;
      // console.log(this.maxBuy, v);
      if (v < this.latestPriceTMin) {
        this.value = this.latestPriceTMin;
        Toast.fail(`最小兑换量为${this.latestPriceTMin}`);
        return;
      }

      if (_this.curOp == "buy") {
        if (Number(v) > Number(this.maxBuy)) {
          this.value = this.maxBuy;
          console.log(this.maxBuy);
          Toast.fail(`最大兑换量为${this.maxBuy}`);
        }
      } else {
        if (Number(v) > Number( this.maxSell)) {
          this.value = this.maxSell;
          Toast.fail(`最大兑换量为${this.maxSell}`);
        }
      }
      if (_this.timer != null) {
        clearTimeout(_this.timer);
      }
      if (v > 0) {
        if (_this.curOp == "buy") {
          _this.getAmountOfUSDTIn();
          _this.buyValue = _this.value;
        } else {
          _this.getAmountOfUSDTOut();
          _this.saleValue = _this.value;
        }
      } else {
        if (_this.curOp == "buy") {
          _this.amountOfUSDTIn = 0;
          _this.buyValue = 0;
        } else {
          _this.amountOfUSDTOut = 0;
          _this.saleValue = 0;
        }
      }
    },
    // 成交量
    async getAmountOfUSDTIn() {
      let _this = this;
      if (_this.value <= 0) {
        _this.amountOfUSDT = 0;
        _this.amountOfUSDTIn = _this.amountOfUSDT;
        return;
      }
      _this.timer = setTimeout(function() {
        _this.MetaSwapInstance.methods
          .getAmountOfUSDTIn(_this.tokenAddress, _this.toWei(_this.value))
          .call(
            {
              from: _this.account,
            },
            (error, result) => {
              _this.amountOfUSDT = _this.fromWei(result);
              _this.amountOfUSDTIn = _this.amountOfUSDT;
            }
          );
      }, 500);
    },
    // 成交量
    async getAmountOfUSDTOut() {
      let _this = this;
      if (_this.value == "0") {
        _this.amountOfUSDT = 0;
        _this.amountOfUSDTOut = _this.amountOfUSDT;
        return;
      }
      _this.timer = setTimeout(function() {
        _this.MetaSwapInstance.methods
          .getAmountOfUSDTOut(_this.tokenAddress, _this.toWei(_this.value))
          .call(
            {
              from: _this.account,
            },
            (err, result) => {
              if (!err) {
                _this.amountOfUSDT = _this.fromWei(result);
                _this.amountOfUSDTOut = _this.amountOfUSDT;
              }
            }
          );
      }, 500);
    },
    async getPrice() {
      this.tokenInstance.getPrice(this.tokenAddress).call();
    },
    async symbol() {
      let _this = this;
      await this.tokenInstance.methods.symbol().call(
        {
          from: this.account,
        },
        function(err, res) {
          if (!err) {
            _this.tokenInfo.symbol = res;
          }
        }
      );
    },
    async name() {
      let _this = this;
      await this.tokenInstance.methods.name().call(
        {
          from: this.account,
        },
        function(err, res) {
          if (!err) {
            _this.tokenInfo.name = res;
          }
        }
      );
    },
    // 买的时候usdt要授权 卖的时候frd 要授权
    async operate() {
      let _this = this;
      if (this.value == "0") {
        Toast.fail("请输入合理的兑换数量");
        return;
      }
      if (this.value < this.latestPriceT) {
        // this.value = this.latestPriceT;
        Toast.fail(`最小兑换量为${this.latestPriceT}`);
        return;
      }
      let ctype = this.curOp;
      if (this.curOp == "buy") {
		  console.log("768");
        let tokenInstance = await this.createInstance(
          this.BEP20USDTAddress,
          BEP20
        );
		console.log("773",this.account, this.MetaSwapAddress);
        // 检查上次授权数量
        let allowance = await tokenInstance.methods
          .allowance(this.account, this.MetaSwapAddress)
          .call({ from: this.account });
		console.log("778");
        console.log("allowance");
        console.log(allowance);
        if (allowance < this.toWei(this.value)) {
          console.log("approve again");
          await tokenInstance.methods
            .approve(this.MetaSwapAddress, this.toWei("100000000"))
            .send({
              from: this.account,
              to: this.MetaSwapAddress,
            });
        }

        let r = await this.MetaSwapInstance.methods
          .swapUSDTToToken(this.tokenAddress, this.toWei(this.value))
          .send({
            from: this.account,
            to: this.MetaSwapAddress,
            gas: 500000,
          })
          .on("transactionHash", function(hash) {
            // 放入记录
            let log = {
              status: null,
              from: _this.account,
              hash: hash,
              token: _this.tokenAddress,
              tokenAmount: _this.format(
                _this.fromWei(_this.toWei(_this.value)),
                _this.latestPriceT
              ),
              usdtAmount: "-",
              createTime: Date.now(),
              ctype: ctype,
            };
            _this.addLog(log);
          })
          .on("receipt", function(receipt) {
            // 查看凭证
            let returnValues = receipt.events.Buy.returnValues;
            let log = {
              status: receipt.status,
              from: receipt.from,
              hash: receipt.transactionHash,
              token: returnValues.token,
              tokenAmount: _this.format(
                _this.fromWei(returnValues.tokenAmount),
                _this.latestPriceT
              ),
              usdtAmount: _this.format(
                _this.fromWei(returnValues.usdtAmount),
                _this.latestPriceU
              ),
              createTime: Date.now(),
              ctype: ctype,
            };
            _this.updateLog(log);
            // _this.toLog(receipt);
            // 更新预计成交额
            _this.getAmountOfUSDTIn();
            // 更新pool
            _this.update();
            return;
          })
          .on("error", function(error, receipt) {
            Toast.fail("出错了");
			console.log('buy error')
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(receipt));
          });
      } else {
		console.log(849)
        let tokenInstance = await this.createInstance(this.tokenAddress, BEP20);

        let allowance = await tokenInstance.methods
          .allowance(this.account, this.MetaSwapAddress)
          .call({ from: this.account });
        console.log("allowance");
        console.log(allowance);
        if (allowance < this.toWei(this.value)) {
          console.log("approve again");
          await tokenInstance.methods
            .approve(this.MetaSwapAddress, this.toWei("100000000"))
            .send(
              {
                from: this.account,
                to: this.MetaSwapAddress,
              },
              function(err, res) {
                if (err) {
                  Toast.fail("授权失败");
                  return;
                }
                console.log(res);
              }
            );
        }
		console.log(875)
        let r = await this.MetaSwapInstance.methods
          .swapTokenToUSDT(this.tokenAddress, this.toWei(this.value))
          .send(
            {
              from: this.account,
              to: this.MetaSwapAddress,
              gas: 500000,
            },
            (err, res) => {
              if (err) {
                Toast.fail("兑换失败" + err.data.name);
                return;
              }
              Toast.success("处理中");
            }
          )
          .on("transactionHash", function(hash) {
            // 放入记录
            let log = {
              status: null,
              from: _this.account,
              hash: hash,
              token: _this.tokenAddress,
              tokenAmount: _this.format(
                _this.fromWei(_this.toWei(_this.value)),
                _this.latestPriceT
              ),
              usdtAmount: "-",
              createTime: Date.now(),
              ctype: ctype,
            };
            _this.addLog(log);
          })
          .on("receipt", function(receipt) {
            // 查看凭证
            console.log("receipt");
            console.log(receipt);
            let returnValues = receipt.events.Sell.returnValues;
            let log = {
              status: receipt.status,
              from: receipt.from,
              hash: receipt.transactionHash,
              token: returnValues.token,
              tokenAmount: _this.format(
                _this.fromWei(returnValues.tokenAmount),
                _this.latestPriceT
              ),
              usdtAmount: _this.format(
                _this.fromWei(returnValues.usdtAmount),
                _this.latestPriceU
              ),
              createTime: Date.now(),
              ctype: ctype,
            };
            _this.updateLog(log);
            // _this.toLog(receipt);
            // 更新预计成交额
            _this.getAmountOfUSDTOut();
            // 更新pool
            _this.update();
            return;
          })
          .on("error", function(error, receipt) {
            Toast.fail("出错了");
			console.log('sale error')
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(receipt));
          });
        console.log(r);
      }
    },
    async update() {
      let r = await this.MetaSwapInstance.methods
        .getSwapPoolByTokenAddress(this.tokenAddress)
        .call({
          from: this.account,
        });
      this.fromPool(r);
      r = await this.tokenInstance.methods.balanceOf(this.account).call({
        from: this.account,
      });
      this.tokenBalance = this.format(
        this.fromWei(r),
        this.fromWei(this.pool.amountPerUint)
      );
      r = await this.BEP20USDT.methods.balanceOf(this.account).call({
        from: this.account,
      });
      this.usdtBalance = this.format(
        this.fromWei(r),
        this.fromWei(this.pool.pricePerUnit)
      );
    },
    async getPool() {
      let r = await this.MetaSwapInstance.methods
        .getSwapPoolByTokenAddress(this.tokenAddress)
        .call(
          {
            from: this.account,
          },
          function(err, res) {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log(res);
            }
          }
        );
      return r;
    },

    async refreshTokenBalance() {
      console.log("refresh token");
      let r = await this.tokenInstance.methods.balanceOf(this.account).call(
        {
          from: this.account,
        },
        function(err, res) {
          console.log(err);
          console.log(res);
        }
      );
      console.log(r);
      // this.tokenBalance = this.fromWei(r);
      this.tokenBalance = this.format(
        this.fromWei(r),
        this.fromWei(this.pool.amountPerUint)
      );
    },
    async refreshUsdtBalance() {
      console.log("usdt balance");
      console.log(this.BEP20USDT);
      let r = await this.BEP20USDT.methods.balanceOf(this.account).call({
        from: this.account,
      });
      console.log("r start");
      console.log(r);
      console.log("r end");
      // this.usdtBalance = this.fromWei(r);
      this.usdtBalance = this.format(
        this.fromWei(r),
        this.fromWei(this.pool.pricePerUnit)
      );
    },
    async getWeb3Psc() {
      console.log("toenadd");
      console.log(this.tokenAddress);
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
      this.BEP20USDT = await this.createInstance(this.BEP20USDTAddress, BEP20);
      this.MetaSwapInstance = await this.createInstance(
        this.MetaSwapAddress,
        MetaSwap
      );
      // this.tokenAddress = this.$route.params.address;
      this.tokenAddress = this.$route.query.address;
      this.tokenInstance = await this.createInstance(this.tokenAddress, BEP20);
      this.symbol();
      this.name();
      // this.instanceInit(web3);
      const acc = await this.web3.eth.getAccounts();
      this.account = acc[0];
      // 全局
      this.$store.commit("setAccount", this.account);
      console.log("account", this.account);
      // this.CreatePool();
      let pool = await this.getPool();
      this.pool = pool;
      this.fromPool(this.pool);
      this.refreshTokenBalance();
      this.refreshUsdtBalance();
      this.upChange();
      // console.log("缓存", JSON.parse(localStorage.getItem(this.account)));
      // this.logs = JSON.parse(localStorage.getItem(this.account));
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
    // 将a格式成b一样的小数位
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
    toShort(hash) {
      return hash.substr(0, 6) + "..." + hash.substr(-4);
    },
    fromPool(pool) {
      this.tokenReserve = this.format(
        this.fromWei(pool.tokenReserve),
        this.fromWei(pool.amountPerUint)
      );
      this.usdtReserve = this.format(
        this.fromWei(pool.usdtReserve),
        this.fromWei(pool.pricePerUnit)
      );
      this.latestPriceU = this.fromWei(pool.currentPricePerUnit);
      this.latestPriceT = this.fromWei(pool.amountPerUint);
      this.latestPriceUMin = this.fromWei(pool.currentPricePerUnit) * 100;
      this.latestPriceTMin = this.fromWei(pool.amountPerUint) * 100;
      this.maxBuy = this.fromWei(pool.maxBuy);
      this.maxSell = this.fromWei(pool.maxSell);
    },
    // 回执信息加入logs
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
      console.log("thislogs");
      console.log(this.logs);
      this.save();
    },
    toLog(receipt) {
      let returnValues = null;
      let ctype = "";
      if (receipt.events.Sell != undefined) {
        ctype = "sell";
        returnValues = receipt.events.Sell.returnValues;
      } else if (receipt.events.Buy != undefined) {
        ctype = "buy";
        returnValues = receipt.events.Buy.returnValues;
      } else {
        return;
      }
      let log = {
        status: receipt.status,
        from: receipt.from,
        hash: receipt.transactionHash,
        token: returnValues.token,
        tokenAmount: this.format(
          this.fromWei(returnValues.tokenAmount),
          this.latestPriceT
        ),
        usdtAmount: this.format(
          this.fromWei(returnValues.usdtAmount),
          this.latestPriceU
        ),
        createTime: Date.now(),
        ctype: ctype,
      };
      this.logs.unshift(log);
      this.save();
    },
    // 保存
    save() {
      console.log("account", this.account);
      localStorage.setItem(this.account, JSON.stringify(this.logs));
    },
    // 更新兑换记录
    upChange(type) {
      console.log("缓存", JSON.parse(localStorage.getItem(this.account)));
      this.logs = JSON.parse(localStorage.getItem(this.account));
      this.logs = this.logs == null ? [] : this.logs;
      if (type === 1) {
        Toast("更新完成");
      }
    },
    deleteChange() {
      localStorage.removeItem(this.account);
      this.logs = [];
    },
  },
};
</script>
<style lang="less">
.exchange {
  min-height: 100vh;
  padding-bottom: 50px;

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
    background-color: #28344C;
    border-radius: 10px;
    // opacity: 0.8;
    min-height: 682px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 16px 15px;

    .volume {
      .volume_top {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;

        .currency {
          font-size: 13px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 10px;
        }

        .label {
          font-size: 10px;
          color: #fff;
          line-height: 18px;
          // text-align: right;
        }

        .value {
          font-size: 14px;
          font-weight: bold;
          color: #96A4C7;
          line-height: 20px;
        }
      }

      .chart {
        min-height: 142px;
        width: 100%;
        margin: 16px 0;
      }
    }

    .trade {
      width: 100%;
    }

    .trade_left {
      margin-right: 10px;
      background-color: #1D2637;
      border-radius: 4px;
      padding: 10px;

      .title {
        font-size: 13px;
        font-weight: bold;
        color: #fff;
      }

      ul {
        li {
          background-color: #2e374d;
          border: 1px solid #15618c;
          border-radius: 4px;
          color: #fff;
        }
        li:first-child {
          min-height: 77px;
          width: 123px;
          margin-bottom: 14px;
        }

        li:last-child {
          min-height: 77px;
          width: 123px;
        }
      }

      .trade_img {
        color: #fff;
        font-size: 13px;
        padding: 10px;
        width: 100%;

        img {
          height: 18px;
          width: 18px;
          vertical-align: middle;
        }

        .num {
          font-weight: bolder;
          text-align: left;
          font-size: 18px;
          word-break: break-all;
        }
      }
    }

    .trade_right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      color: #4c5360;

      .img {
        font-size: 15px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        // display: flex;
        // align-items: center;
        // justify-content: center;
      }

      .sale {
        height: 40px;
        width: 87px;
        .cp-btn-container {
          width: 100%;
          height: 100%;
          line-height: 40px;
        }
        // margin-left: 10px;
      }

      .buy {
        height: 40px;
        width: 87px;
        .cp-btn-container {
          width: 100%;
          height: 100%;
          line-height: 40px;
        }
        // margin-left: 10px;
      }

      .wallet {
        font-size: 10px;
        margin-bottom: 8px;
        color: #96A4C7;
      }

      .jia {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2e374d;
        border: 0.0625rem solid #15618c;
        border-radius: 4px;

        &.estimate {
          height: auto;
          > span:last-child {
            display: block;
            flex: 1;
            max-width: 40%;
            text-align: right;
            padding: 4px;
          }
        }


        img {
          height: 10px;
          width: 10px;
          margin-left: 11px;
        }

        input {
          // height: 100%;
          border: none;
          background: #2e374d;
          color: #fff;
          width: 100px;
          text-align: center;
        }

        span:first-child {
          color: #9297b5;
          font-size: 11px;
        }

        span:last-child {
          font-weight: bold;
          color: #fff;
          font-size: 13px;
        }
      }

      .submit {
        background: url("~@/assets/images/crossChain/confirm.png") no-repeat center
          center;
        background-size: 100% 100%;
        width: 100%;
        height: 42px;
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
      }
    }

    .FRD {
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 8px;
      }

      ul {
        background: #1D2637;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
        padding: 13px 0 0;

        li {
          width: 33.33%;
          // padding: 13px 0;

          > div {
            width: 99%;
            // border-right: 1px solid #35f8f4;
          }

          .tit {
            font-size: 10px;
            font-weight: 500;
            color: #fff;
            text-align: center;
          }

          .num {
            font-size: 9px;
            font-weight: 500;
            color: #96A4C7;
            text-align: center;
            margin: 7px 9px;
          }

          .line {
            width: 22px;
            height: 1px;
            background: #96A4C7;
            margin: 10px auto;
          }

          .right_line {
            display: flex;
            flex: 1;
            width: 1px;
            height: 19px;
            background: #96A4C7;
            margin-top: 10px;
          }
        }
      }
    }

    .exchange-record {
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
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
</style>
