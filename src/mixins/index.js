import ListRender from '@/components/template-render/pages/list.vue';
import DetailRender from '@/components/template-render/pages/detail.vue';
export default {
  data() {
    return {
      // 弹出框label宽度
      diaLabelWidth: '96px',
      // 最大输入长度
      maxInputLen: 200,
      // 日期范围默认
      defaultRangeTime: ['00:00:00', '23:59:59']
    }
  },

  methods: {
    reset() {
      this.search = this.$storage.getItem(this.$storage.searchFlag)[this.searchKey]
      this.getList(1)
    },
    getList(page = 1) {
      this.loading = true
      if (page && !isNaN(page)) {
        this.search.page = page
      } else {
        this.search.page = 1
      }
      return new Promise(resolve => {
        this.HCXHR.GET(`${this.searchUrl}?${qs.stringify(this.search)}`).then((res) => {
          this.loading = false
          if (res.code === 'success') {
            this.list = res.data.list || []
            this.pagNav.totalCount = res.data.total || 0
            this.$nextTick(() => {
              this.saveList({}, this.search, res.data.list)
            })
            resolve(res)
          }
        })
      })
    },

    /**
     * 传入图片Id, 返回 base64, 放入url中，就可预览
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    previewImage(id) {
      let host = this.globalVar.baseURL.fileApp
      return axios.get(host + '/file/down?fileId=' + id, {
        responseType: 'blob'
      }).then(res => {
        try {
          let headerDisposition = res.headers['content-disposition']
          let isImage = /\.(BMP|JPG|JPEG|PNG|GIF|pic|tif|pdf')$/i.test(headerDisposition)
          let blob = new Blob([res.data], {
            type: 'image/jpeg'
          })
          let reader = new FileReader()

          // reader 读取blob 也是个异步事件
          reader.readAsDataURL(blob)
          return new Promise((resolve, reject) => {
            reader.onloadend = (e) => {
              isImage ? resolve(reader.result) : resolve(null)
            }
          })
        } catch (e) {
          console.log(e)
        }
      })
    },
    /**
     * 是否为对象类型
     */
    checkObject(val) {
      return val && Object.prototype.toString.call(val) === '[object Object]'
    },
    /**
     * 是否为字符串类型
     */
    checkString(val) {
      return val && Object.prototype.toString.call(val) === '[object String]'
    }
  },
  computed: {
    language() {
      return this.$store.state.language
    }
  },
  components: {
    ListRender,
    DetailRender
  }
}