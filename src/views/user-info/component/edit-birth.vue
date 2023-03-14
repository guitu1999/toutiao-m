<template>
    <div>
        <van-datetime-picker @cancel="$emit('closePop')" type="date" @confirm="confirm" v-model="currentDate"
            @change="change" title="选择日期" :min-date="minDate" :max-date="maxDate" />
    </div>
</template>

<script>
import { edituserInfoApi } from '../../../api/index.js'
import dayjs from 'dayjs'
export default {
    props: {
        value: {
            type: [String, Number]
        }
    },
    data() {
        return {
            minDate: new Date(1960, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value),

        }
    },
    methods: {
        change(selectedValues, selectedOptions, columnIndex) {
            console.log('时间改变了', selectedValues, selectedOptions, columnIndex);
            console.log('选择的时间', this.currentDate, dayjs(this.currentDate).format('YYYY-MM-DD'));
        },
        async confirm() {
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true,
                duration: 0
            })
            try {
                let birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
                await edituserInfoApi({
                    birthday: birthday
                })
                this.$emit('closePop')
                this.$emit('input', birthday)
                this.$toast.success('更新成功')

            } catch (err) {
                this.$toast.fail('更新失败')

            }
        }
    }
}
</script>

<style scoped></style>