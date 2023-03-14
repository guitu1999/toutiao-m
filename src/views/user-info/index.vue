<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar class="nav_bar" left-arrow @click-left="onClickLeft" title="个人信息"></van-nav-bar>
        <!-- 个人信息 -->
        <van-cell @click="editAvator" title="头像" is-link>

            <van-image fit="cover" round class="avater" :src="userInfo.photo" />
        </van-cell>

        <van-cell title="昵称" @click="isUpdateNameShow = true" :value="userInfo.name" is-link></van-cell>
        <van-cell title="性别" @click="isUpdateSexShow = true" :value="userInfo.gender === 0 ? '男' : '女'" is-link></van-cell>

        <van-cell title="生日" @click="isUpdateBirShow = true" :value="userInfo.birthday" is-link></van-cell>
        <!-- 编辑昵称弹层 -->
        <van-popup v-model="isUpdateNameShow" style="height: 80%;" position="bottom">
            <editName v-if="isUpdateNameShow" @closePop="isUpdateNameShow = false" v-model="userInfo.name"></editName>
        </van-popup>
        <!-- 编辑性别弹窗 -->
        <van-popup v-model="isUpdateSexShow" style="height: 50%;" position="bottom">
            <editGender v-if="isUpdateSexShow" @closePop="isUpdateSexShow = false" v-model="userInfo.gender"></editGender>
        </van-popup>
        <!-- 编辑生日弹窗 -->
        <van-popup v-model="isUpdateBirShow" style="height: 50%;" position="bottom">
            <editBirth v-if="isUpdateBirShow" @closePop="isUpdateBirShow = false" v-model="userInfo.birthday"></editBirth>
        </van-popup>
        <!-- 头像弹窗 -->
        <input @change="avaChange" type="file" ref="avator" hidden>
        <!-- 编辑头像 -->
        <van-popup v-model="isUpdateAvaShow" style="height: 100%;" position="bottom">
            <editAvater v-if="isUpdateAvaShow" @upImg="userInfo.photo = $event" @closePop="isUpdateAvaShow = false"
                :img_src="img_src">
            </editAvater>
        </van-popup>
    </div>
</template>

<script>
import { userInfoApi } from '../../api/index.js'
import editName from './component/edit-name.vue'
import editGender from './component/edit-gender.vue'
import editBirth from './component/edit-birth.vue'
import editAvater from './component/edit-avater.vue'
export default {
    components: {
        editName,
        editGender,
        editBirth,
        editAvater
    },
    created() {
        this.getinfo()
    },
    data() {
        return {
            userInfo: {},//个人信息
            isUpdateNameShow: false,//修改名称
            isUpdateSexShow: false,//修改性别
            isUpdateBirShow: false,//编辑生日
            isUpdateAvaShow: false,//头像
            img_src: null,//头像地址
        }
    },
    methods: {
        //请求个人信息
        async getinfo() {
            try {
                let { data } = await userInfoApi()
                console.log('个人信息', data);
                this.userInfo = data.data
            } catch (err) {

            }
        },

        //导航左侧图标书简
        onClickLeft() {
            this.$router.back()
        },
        //编辑头像
        editAvator() {
            this.$refs.avator.click()
            console.log('头像', this.$refs.avator);
        },
        //头像更改了
        avaChange() {
            console.log('改变了', this.$refs.avator.files[0]);
            //获取文件对象  
            //基于文章对象获取blob数据
            this.img_src = window.URL.createObjectURL(this.$refs.avator.files[0])
            console.log(' this.img_src', this.img_src);
            this.isUpdateAvaShow = true
            //如果选择同一个文件不会触发change事件  清空value
            this.$refs.avator.value = ''

        },
    }
}
</script>

<style scoped>
.avater {
    width: 60px;
    height: 60px;
}
</style>