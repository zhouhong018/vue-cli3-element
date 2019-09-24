<template>
    <div>
        <detail-render ref="detail" :config="config"></detail-render>
    </div>
</template>
<script>
import config from '../config/detail'; // 详情页配置参数
export default {
    data () {
        return {
            config: config
        }
    },
    methods: {
        detail_remove() { // 自定义详情头部删除方法，应为组件内remove方法暂时不能满足
            this.$popconfirm(event.target, '是否确定删除?')
            .then(() => {
                this.HCXHR.delete(`${this.config.api.$delete}/${this.formData._id}`, this.formData).then((res) => {
                if (res.code === 'success') {
                    this.$message.success('删除成功');
                    this.$router.push('../../oneinfo');
                }
                });
            })
            .catch(() => {

            });
        }
    },
    mounted() {

    },
}
</script>