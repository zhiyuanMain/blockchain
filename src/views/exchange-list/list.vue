<template>
    <ul class="container">
        <li
            v-for="(item, idx) in list"
            :key="idx"
        >
            <section class="top">
                <div class="left">
                    <img :src="item.img" />
                    <span class="title">{{item.title}}</span>
                    <span class="sub-title">{{item.subTitle}}</span>
                </div>
                <div class="right">
                    {{item.price}}
                </div>
            </section>
            <section class="bottom">
                <div class="left">
                    <img :src="item.cursorImg" />
                    <span class="title">{{item.time}}</span>
                    <span class="sub-title">{{item.timePrice}}</span>
                </div>
                <div 
                    :class="['right', type === 'current' ? 'current' : '']"
                >
                    {{item.cPrice}}
                </div>
            </section>
        </li>
    </ul>
</template>

<script>
const resolveImg = (name) => require(`@/assets/images/exchange/item-icon-${name}.png`)
const INIT_LIST = [
    {title: 'mtc', subTitle: 'usdt', price: 2576.93, time: 24, timePrice: 734.8, cPrice: 576.93},
    {title: 'tts1', subTitle: 'usdt', price: 2576.93, time: 24, timePrice: 734.8, cPrice: 576.93},
    {title: 'drd', subTitle: 'usdt', price: 2576.93, time: 24, timePrice: 734.8, cPrice: 576.93},
    {title: 'ftd', subTitle: 'usdt', price: 2576.93, time: 24, timePrice: 734.8, cPrice: 576.93},
    {title: 'frd', subTitle: 'usdt', price: 2576.93, time: 24, timePrice: 734.8, cPrice: 576.93}
]

const genMockData = () => {
    return INIT_LIST.map(item => ({
        ...item,
        title: item.title.toUpperCase(),
        img: resolveImg(item.title),
        cursorImg: resolveImg('cursor')
    }))
}
export default {
    name: 'exchangeList',
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            list: genMockData()
        }
    },

}
</script>

<style lang="less" scoped>
    .container {
        &__item {

        }
    }
</style>