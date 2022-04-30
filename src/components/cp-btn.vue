<template>
    <div 
        :class="['cp-btn-container', type]"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'cpBtn',
    props: {
        type:{
            type: String,
            default: 'primary',
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
    .cp-btn-container {
        display: inline-block;
        background: no-repeat center center;
        background-size: cover;
        background-image: url("~@/assets/images/cp/cpbtn-bg-primary.png");
        text-align: center;
        
        &.warn {
            background-image: url("~@/assets/images/cp/cpbtn-bg-warn.png");
        }
    }
</style>