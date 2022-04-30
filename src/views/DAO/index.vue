<template>
  <div class="DAO">
    <div class="banner">
      <h2>DAO</h2>
    </div>
    <div class="main">
      <ul>
        <li 
          class=""
          v-for="(item, idx) in list"
          :key="idx"
          :style="{'background-image': `url(${item.bg})`}"
        >
          <a :href="item.link ? item.link : 'javascript:void(0)'">
            <div class="top">
              <div class="left-box">
                <img class="img" :src="require(`@/assets/images/DAO/icon_${idx}.png`)" />
                <span class="title">{{item.title}}</span>
              </div>
              <section class="right-box">
                <cp-btn
                  :type="item.status === 'statusReady' ? 'primary' : 'warn'"
                >
                  {{$t(`DAO.${item.status}`)}}
                </cp-btn>
              </section>
            </div>
            <div class="bottom">
              <span>{{item.count}}</span>
              <span>{{item.subTitle}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import cpBtn from '../../components/cp-btn.vue';

const resolveImg = idx => require(`@/assets/images/DAO/dao-list-${idx}.png`)

const INIT_LIST = [
  {index: 0, title: 'FREE DAO', status: 'statusOptimization', count: '0.0000000', subTitle: 'FRD', link: '', bg: resolveImg(1)},
  {index: 1, title: 'TTSI DAO', status: 'statusReady', count: '0.0000000', subTitle: 'TTS1', link: 'https://testaaa.tts1.top', bg: resolveImg(2)},
  {index: 2, title: 'METAG DAO', status: 'statusOptimization', count: '0.0000000', subTitle: 'MTG', link: '', bg: resolveImg(3)},
  {index: 3, title: 'Dream DAO', status: 'statusQuene', count: '0.0000000', subTitle: 'DRD', link: '', bg: resolveImg(4)},
  {index: 4, title: 'FUTURE DAO', status: 'statusQuene', count: '0.0000000', subTitle: 'FTD', link: '', bg: resolveImg(5)}
]
export default {
  components: { cpBtn },
  name: "DAO",
  data() {
    return {
      list: [...INIT_LIST]
    };
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
<style lang="less" scoped>
.DAO {
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  background: url("~@/assets/images/home/new/app_bg.png") repeat-y;
  background-size: 100%;
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
    background-size: 100% 100%;
    min-height: 682px;
    margin: 0px 15px;
    margin-top: -140px;
    padding: 15px 1px;
    ul {
      li {
        height: 86px;
        border-radius: 8px;
        margin-bottom: 20px;
        background-size: cover;

        > a {
          display: block;
          padding: 15px 10px;
          color: #fff;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;

          .left-box {
            display: flex;
            .img {
              display: block;
              width: 23px;
              height: 23px;
              margin-right: 5px;
            }

            .title {
              font-size: 20px;
              font-weight: bold;
            }
          }

          .right-box {
             .cp-btn-container {
              width: 70px;
              height: 30px;
              line-height: 30px;
            }
          }
        }

        .bottom {
          font-size: 20px;

          span {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
