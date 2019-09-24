const CONS = {
    btnText: { // key 对应 方法名
      add: '新增',
      edit: '编辑',
      remove: '删除',
      save: '保存',
      submit: '提交',
      toAdd: '新增',
      toEdit: '编辑',
  
      back: '返回'
    },
  
    apiMethods: { // 方法对应的 请求 类型
      '$list': 'GET', // 列表 -> 列表
      '$add': 'POST', // 列表 -> 添加
      '$merge': 'PUT', // 列表 - > 修改
      '$delete': 'DELETE' // 列表 - > 删除
    },
  
    ruleTrigger: {
      input: 'blur',
      select: 'change',
      radio: 'change'
    }
  };
  
  export default CONS;