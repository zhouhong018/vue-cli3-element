const cols = [{ // 详情头信息数据
  key: 'name',
  label: '姓名'
}, {
  key: 'age',
  label: '年龄'
}, {
  key: 'sex',
  type: 'select',
  source: 'sex',
  label: '性别'
}, {
  key: 'country',
  type: 'select',
  source: 'country',
  label: '国家'
}, {
  key: 'time',
  type: 'date',
  label: '提交日期'
}];

export default cols;