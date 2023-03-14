<template>
    <div>
        <van-nav-bar class="title" title="昵称" left-text="取消" right-text="完成" left-arrow @click-left="$emit('closePop')"
            @click-right="editInfo()" />
        <van-cell-group inset>
            <van-field class="iptbox" v-model.trim="name" rows="2" autosize type="textarea" maxlength="7"
                placeholder="请输入名称" show-word-limit />
        </van-cell-group>
    </div>
</template>

<script>
import { edituserInfoApi } from '../../../api/index.js'
export default {
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            name: this.value
        }
    },
    methods: {
        //修改个人信息
        async editInfo() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                await edituserInfoApi({
                    name: this.name
                })
                this.isUpdateNameShow = false
                this.$emit('input', this.name)
                //关闭弹窗
                this.$emit('closePop')
                this.$toast.success('更新成功')
            } catch (err) {
                this.$toast.fail('更新失败')
            }
        },
    }
}
</script>

<style scoped>
.iptbox {
    border: 1px solid #ccc;
}

/deep/.title .van-nav-bar__title {
    color: #000 !important
}
</style>