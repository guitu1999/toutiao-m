<template>
    <div class="box">
        <img ref="img" class="imgbox" :src="img_src" alt="">
        <div class="tool">
            <div class="cel" @click="$emit('closePop')">取消</div>
            <div class="cfm" @click="finish">完成</div>
        </div>
    </div>
</template>

<script>
import { editAvaterApi } from '@/api/index.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    mounted() {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1, // 只能在裁剪的图片范围内移动
            dragMode: 'move', // 画布可以移动
            aspectRatio: 1, // 裁剪区默认正方形
            autoCropArea: 1, // 自动调整裁剪图片
            cropBoxMovable: false, // 禁止裁剪区移动
            cropBoxResizable: false, // 禁止裁剪区缩放
            background: false // 关闭默认背景
        })
        console.log(this.cropper)
    },
    data() {
        return {
            cropper: null
        }
    },
    props: {
        img_src: {
            type: [String, Object],
            required: true
        }
    },
    methods: {
        finish() {
            //基于服务器端的裁切使用 getData方法获取裁切参数
            // console.log(this.cropper.getData())
            // 纯客户端 的裁切使用 getCroppedCanvas 获取裁切的文件对象
            this.cropper.getCroppedCanvas().toBlob(async blob => {
                console.log(blob)
                //如果接口 Content-Type是multipart/form-data
                //必须传递FormData对象

                //如果接口 Content-Type是application/json
                //传普通js对象
                const formData = new FormData()
                formData.append('photo', blob)
                const data = await editAvaterApi(formData)
                console.log('data111', data);
                //关闭弹出层
                this.$emit('closePop')
                //更新视图
                this.$emit('upImg', data.data.data.photo)
            })
        }
    }
}

</script>

<style scoped lang="less">
.box {
    background-color: #000;
    height: 100%;
    color: #fff;
}

.imgbox {
    max-width: 100%;
    display: block;
}

.tool {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .cel,
    .cfm {
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>