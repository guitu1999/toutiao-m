import Vue from 'vue'
import dayjs from 'dayjs'
//dayjs  默认语言是英文 配置成中文
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')  //全局使用
//获取当前最新事件
console.log('dayjs().format', dayjs().format('YYYY-MM-DD'));
import relativeTime from 'dayjs/plugin/relativeTime'
//配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// console.log(dayjs().from(dayjs('1990-01-01')));
// console.log(dayjs().from(dayjs('1990-01-01'), true));
// console.log(dayjs().fromNow());
console.log(dayjs().to(dayjs('2015')));
// console.log(dayjs().toNow());
//定义一个全局过滤器(全局可用的方法)仅供模板使用
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})