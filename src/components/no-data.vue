<template>
  <div class="no-data">
    <div class="flex center">
      <img :src="icon" alt="" class="w-20" />
    </div>
    <p class="text-center fs-12 lh-20 mt-10">{{ message || $t('common.no-data')}}</p>
  </div>
</template>
<script>
const icon = require('@/assets/images/components/no-pro.png')
import i18n from '@/langs'
export default {
  name: 'no-data',
  props: {
    message:{
        type: String,
        default: '',
      },
    icon: {
      type: String,
      default: icon,
    },
  },
}
</script>
<style lang="less" scoped>
.no-data {
  color: #999999;
  padding: 30px 0;
}
</style>
