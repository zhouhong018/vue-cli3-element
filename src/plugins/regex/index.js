/**
 * 公共常用正则
 *
 * @export
 * @param {any} Vue Vue 对象
 */
export default function install(Vue) {
    Vue.prototype.$reg = {
      password: /^(([0-9]+)|([a-zA-Z]+)|([~!@#$%^&*()\-_+=]+))$/,
      mobile: /^1\d{10}$/,
      number: /^\d+(\.\d+)?$/,
      telephone: /^\d{3,4}-?\d{7,8}$/,
      url: /^([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?$/,
      ipad: global.navigator.userAgent.indexOf('iPad') > -1,
      email: /^[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i,
      price: /\d{1,3}(?=(\d{3})+$)/,
      // 日期格式字符串
      dateFormat: 'yyyy/MM/dd',
      // 日期+时间
      dateTimeFormat: 'yyyy/MM/dd hh:mm:ss',
      // 日期-月份
      monthFormat: 'yyyy/MM'
    };
    Vue.prototype.$regObj = {
      password: {
        pattern: /^1\d{10}$/,
        message: '请输入正确格式的密码'
      },
      number: { // 数字
        pattern: /^-?\d+(\.\d+)?$/,
        message: '请输入数字'
      },
      positiveNum: { // 正数 -- 包含0，可以是正小数
        pattern: /^\d+(\.\d+)?$/,
        message: '请输入正数字'
      },
      positiveInt: { // 正整数 - 包含0，不能是小数
        pattern: /^\d+$/,
        message: '请输入正整数字'
      },
      mobile: {
        pattern: /^1\d{10}$/,
        message: '请输入正确格式的手机号'
      },
      email: {
        pattern: /^[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i,
        message: '请输入正确格式的邮箱'
      }
    };
    Vue.prototype.$xDateFormat = (val, fmt = 'yyyy/MM/dd hh:mm:ss') => {
      if (!val) {
        return '';
      }
      const d = new Date(val);
      const o = {
        'M+': d.getMonth() + 1, // 月份
        'd+': d.getDate(), // 日
        'h+': d.getHours(), // 小时
        'm+': d.getMinutes(), // 分
        's+': d.getSeconds(), // 秒
        'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
        'S': d.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    };
  };