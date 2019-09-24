import Vue from 'vue'
import confirmVue from './main.vue'

const ConfirmVueConstructor = Vue.extend(confirmVue)

class PopConfirm {
  constructor(el, message = '', direction = 'bottom', confirmed, reject, canceled) {
    const pop = this
    // 因为确认不遮住按钮，按钮再次点击时， 不重复弹出确认框
    if (el.instance) {
      return
    }

    const instance = new ConfirmVueConstructor({
      el: document.createElement('div')
    })

    instance.placement = direction
    instance.message = message

    instance.confirmed = function () {
      confirmed && confirmed()
      // 确认框消失后进行后续清除
      // pop.clean();
    }
    instance.reject = function () {
      reject && reject()
      // 确认框消失后进行后续清除
      pop.clean()
    }
    instance.canceled = function () {
      canceled && canceled()
      // 确认框消失后进行后续清除
      pop.clean()
    }
    document.body.appendChild(instance.$el)
    instance.setRef(el)
    el.instance = instance

    Vue.nextTick(() => {
      instance.visible = true
    })

    this.btn = el
    this.instance = instance
  }

  clean() {
    this.instance.$destroy()
    this.btn.instance = null
  }
}

export default PopConfirm
export {
  PopConfirm
}