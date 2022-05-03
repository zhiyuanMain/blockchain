// 首页菜单配置项
const langs = [...$const.langs]
import i18n from '@/langs'
import cookie from 'js-cookie'
import { Toast } from 'vant';
// 初始化语言菜单
langs.forEach((item) => {
  item.label = item.name
  item.event = 'click'
  // $utils.setLanguage(item.value);
  item.fun = () => {
    console.log('item', item.value)
    $utils.setLanguage(item.value);
    // 切换用户语言
    // if (cookie.get('token')) {
    //   Toast.loading({
    //     mask: true
    //   });
    //   $api.fns.Account.changeLanguage({
    //     params: item.value
    //   }).then(res => {
    //     $utils.setLanguage(item.value);
    //   }).finally(err => Toast.clear());
    // } else {
    //   $utils.setLanguage(item.value);
    // }
  }
  item.check = false


})
export default [




  // {
  //   route: {
  //     name: 'about'
  //   },
  //   name: 'about',
  //   label: 'Bithumb Family',
  //   event: 'link'
  // },
  {
    name: 'language',
    label: 'components/header.lang',
    children: langs,
    activeName: ''
  },

]