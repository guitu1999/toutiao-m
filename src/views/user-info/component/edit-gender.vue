<template>
    <div>
        <!-- <van-nav-bar class="title" title="性别" left-text="取消" right-text="完成" left-arrow @click-left="$emit('closePop')"
            @click-right="editInfo()" /> -->
        <van-picker show-toolbar :default-index="value" title="性别" :columns="columns" @confirm="onConfirm"
            @cancel="$emit('closePop')" @change="onChange" />
    </div>
</template>

<script>
import { edituserInfoApi } from '../../../api/index.js'
export default {
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            columns: ['男', '女'],
            sex: this.value
        }
    },
    methods: {
        //确定
        async onConfirm(val) {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                await edituserInfoApi({
                    gender: this.sex
                })
                this.$emit('closePop')
                this.$emit('input', this.sex)
                this.$toast.success('更新成功')
            } catch (err) {
                this.$toast.fail('更新失败')
            }
        },
        // 更改性别
        onChange(val, index, selectedIndexes) {
            console.log('改变了', val, index, selectedIndexes);
            this.sex = selectedIndexes
        }
    }
}
</script>

<style scoped>
/deep/.title .van-nav-bar__title {
    color: #000 !important
}
</style>