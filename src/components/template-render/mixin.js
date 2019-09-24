import CONS from './cons';
import SOURCE from '@/data/source';
export default {
  methods: {
    fnInvoker(name, ...arg) {
      let par = this.$root.temporaryMount;

      let method = par[name] || this[name];
      if (method && typeof method === 'function') {
        this.setParentData(par, ...arg);
        method(...arg);
      }
    },
    setParentData(par, row, $event = {}) {
      if (row instanceof MouseEvent) {
        $event = row;
        row = this.formData || {};
      }

      let data = {
        target: $event.target,
        data: row
      };

      for (let i in data) {
        par[i] = data[i];
      };
    },
    btnsMeta(btns = {}) {
      let btnText = CONS.btnText;
      let resBtns = {};

      for (let i in btns) {
        let btn = btns[i];
        typeof btn !== 'object' && (btn = {});

        let def = {
          key: i,
          click: i,
          label: btnText[i]
        };

        // 为了保存 btn 的 数据劫持
        for (let j in def) {
          btn[j] === undefined && (btn[j] = def[j]);
        }
        resBtns[i] = btn
      }

      return resBtns;
    },
    showOpe() {
      let flag = false;
      let opes = this.config.opes || {};

      if (Object.keys(opes).length) {
        flag = true;
      }

      return flag;
    },
    listmeta(cols) {
      return cols.filter(i => {
        return !i.listHide;
      });
    },
    /**
     * 用于获取：1、 key -> value 映射值
     *           2、 时间戳 转换成 string
     * @param {Number|String} year 年份
     * @return {Boolean} 布尔值
     */
    getRealVal(val, item, index, row) {
      // [---- 1 ----] map 的 映射值
      let type = item.type || 'input';

      item.key === '@index' && !row._totalType && (val = index + 1 - this.hideIndex - this.totalIndex);

      if (val !== null) {
        // 下拉框取label
        if (type === 'select') {
          let arr = SOURCE[item.source];
          arr.forEach((item) => {
            item.value === val && (val = item.label);
          });
        }

        // [---- 2 ----] 时间戳 转 str, 2003 年的值是 1041379200000，暂时大于 10e11 就算是时间
        if (type.indexOf('date') > -1 /* && val > 10e11 */ ) {
          let format = 'yyyy/MM/dd' + (type.indexOf('time') > -1 ? ' hh:mm:ss' : '');
          val = this.$xDateFormat(val, format);
        }
      }

      return val;
    },

    // 搜索数据转换
    convertSearch(data, meta) {
      let newData = {};

      meta.forEach(i => {
        let key = i.key;
        let val = data[key];
        if (val !== undefined && val !== null) {
          if (i.search && i.search.toRange) {
            let toRange = i.search.toRange;
            typeof toRange !== 'object' && (toRange = {
              names: ['@Start', '@End']
            });

            toRange.names.forEach((m, n) => {
              newData[m.replace('@', key)] = val[n].getTime() + (n === 1 ? 86300000 : 0);
            });
          } else {
            newData[key] = val;
          }
        }
      });
      return newData;
    }
  },
  mounted() {
    this.$root.temporaryMount = this.$parent;
  }
}