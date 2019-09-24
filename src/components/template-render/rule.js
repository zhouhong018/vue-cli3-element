import CONS from './cons';

function generateRule(config, ctx) {
  // 如果没有 config 和 config cols，则返回
  if (!config || !config.cols) return;

  let cols = config.cols,
    rules = {},
    reg = /\*$/,
    trig = CONS.ruleTrigger;

  // config 中 rule 写法：
  // 	rule = {
  // 		type: 'all', // 所有字段为必须
  // 		type: 'off', // 除了index 位置为必填
  // 		type: 'on',  // index 位置为必填
  // 		index: '0 1 2', // 表示 0 1 2的3个位置，以空格隔开
  // 		index: '2-3' // 表示2 到 3 的2个位置
  // 	}

  // 总规则 
  let rule = config.rule;
  if (rule) { // 含有rule
    let include = [];
    rule.index && (include = parseIndexStr(rule.index));
    let isIndex = include[0] !== undefined && !isNaN(include[0]); // include中是index还是key

    cols.forEach((v, i) => {
      let val = isIndex ? i : v.key;
      if ((rule.type === 'all') ||
        (rule.type === 'on' && include.indexOf(val) > -1) ||
        (rule.type === 'off' && include.indexOf(val) === -1)) {
        addRules(v);
      };
    });
  }

  // cols 中rule
  cols.forEach(i => {
    // label 以 * 结尾
    let str = i.label;
    if (str.match(reg)) {
      i.label = str.replace(reg, '');
      addRules(i);
    }
  });

  function addRules(i) {
    let trigger = trig[i.type || 'input'] || 'blur';
    rules[i.key] = [{
      required: !0,
      message: i.label + '不能为空',
      trigger: trigger
    }];
  }

  /**
   * 解析indexStr 成 数组 '1 4 - 6 13' 成 [1, 4, 5, 6, 13]
   * 如果不是数字 则直接返回
   * @param  {[type]} str [description]
   * @return {[type]}       [description]
   */
  function parseIndexStr(str) {
    let arr = [];

    if (typeof str === 'string') {
      str = str.replace(/ +- +/g, '-');
      str.split(' ').forEach(i => {
        if (i.indexOf('-') > -1) {
          i = i.split('-');
          for (let j = Number(i[0]); j <= Number(i[1]); j++) {
            arr.push(j);
          }
        } else {
          arr.push(isNaN(i) ? i : Number(i));
        }
      });
    } else if (str instanceof Array) {
      arr = str;
    }

    return arr;
  }
  return rules;
}

export default generateRule;