<template>
    <div>
        <van-cell title="搜索历史">
            <div v-if="is_del">
                <span @click="$emit('allDelHis')">全部删除</span>
                &nbsp;&nbsp;
                <span @click="is_del = false">完成</span>
            </div>

            <van-icon v-else @click="is_del = true" name="delete">

            </van-icon>
        </van-cell>

        <van-cell @click="toclick(item, index)" v-for="(item, index) in searchList" :title="item">
            <van-icon v-if="is_del" name="close"></van-icon>
        </van-cell>

    </div>
</template>

<script>
export default {
    props: {
        searchList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            is_del: false
        }
    },
    methods: {
        //点击搜索历史
        toclick(str, index) {
            //删除状态
            if (this.is_del) {
                this.searchList.splice(index, 1)
            } else {
                //不删除 直接搜索
                this.$emit('search', str)
            }
        }
    }
}
</script>

<style scoped></style>