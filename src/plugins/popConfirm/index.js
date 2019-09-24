import PopConfirm from './main'

async function popconfirm(el, message, direction) {
  return new Promise(function (resolve, reject) {
    new PopConfirm(el, message, direction, resolve, reject)
  })
}

export default popconfirm