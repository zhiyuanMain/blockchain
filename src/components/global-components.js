/**
 * 在此处注册全局组件
 * @Date: 2022-03-27 17:33:03
 */

import Vue from 'vue'
import clipboard from 'vue-clipboard2'
import Nodata from './no-data'
import i18n from '@/langs'
import {
  Cell,
  Collapse,
  CollapseItem,
  Skeleton,
  Button,
  Dialog,
  Toast,
  Icon,
  Divider,
  Field,
  Uploader,
  Overlay,
  Sticky,
  DropdownMenu,
  DropdownItem,
  Loading,
  Tab,
  Tabs,
  ActionSheet,
  NumberKeyboard,
  Picker,
  Form,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Lazyload,
  Empty,
  Tabbar,
  TabbarItem,
} from 'vant'
import MHeader from './m-header.vue'
import NavHeader from './nav-header.vue'
import MFooter from './footer.vue'

Vue.use(Icon);
Vue.prototype.$toast = Toast
Vue.component(Skeleton.name, Skeleton)
Vue.component(Button.name, Button)
Vue.component(Dialog.Component.name, Dialog.Component)
Vue.component('no-data', Nodata)
Vue.component(Divider.name, Divider)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Cell.name, Cell)
Vue.use(Sticky)

Vue.component('m-header', MHeader)
Vue.component('nav-header', NavHeader)
Vue.component('m-footer', MFooter)

Vue.prototype.$dialog = Dialog

// Vue.prototype.$dialog.alert = (opt) => {
//     return Dialog.alert({
//         confirmButtonText:i18n.t('accountMyAssetsOrders.jsontran-detail.btn'),
//         cancelButtonText:i18n.t('common.cancel')
//     },...opt)
// }
clipboard.config.autoSetContainer = true
Vue.use(clipboard)
Vue.use(Icon)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(Overlay)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(ActionSheet)
Vue.use(NumberKeyboard)
Vue.use(Picker)
Vue.use(Form)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(VanImage)
Vue.use(Lazyload)
Vue.use(Empty)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
