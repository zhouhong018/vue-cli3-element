<template>
    <div>
        <list-render ref="list" :config="config"></list-render>
    </div>
</template>
<script>
import config from '../config/list'; // 列表页配置参数
export default {
    data () {
        return {
            config: config
        }
    },
    methods: {
        toDeatil(row) { // 自定义方法
            this.$router.push(`./oneinfo/detail/${row._id}`)
        }
    }
}
</script>