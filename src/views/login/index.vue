<template>
    <div class="login-container">
        <!-- 顶部导航 -->
        <van-nav-bar left-arrow @click-left="$router.back()" class="nav_bar" style="color:blue;" title="登录" />

        <!-- 登录表单 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <van-field v-model="user.mobile" type="number" maxlength="11" name="mobile" placeholder="请输入手机号"
                :rules="userRules.mobile">
                <i slot="left-icon" class="iconfont icon-shouji"></i>
            </van-field>

            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">

            </van-divider>
            <van-field maxlength="6" v-model="user.code" name="code" placeholder="请输入验证码" :rules="userRules.code">
                <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <!-- 倒计时 -->
                    <van-count-down @finish="is_time = false" v-if="is_time" format="ss s" :time="time" />
                    <van-button v-else @click="sendBtn" size="small" native-type="button" round class="send_btn"
                        type="default">发送验证码</van-button>
                </template>
            </van-field>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            </van-divider>

            <!-- 登录按钮 -->
            <div style="margin: 16px;padding: 53px 33px;">
                <van-button round block color="#6db4fb" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>


    </div>
</template>

<script>
//引入vuex中的同步方法
import { mapMutations } from 'vuex';
//引入登录请求
import { loginApi, sendMsgApi } from '../../api/index.js';
export default {
    name: 'LoginIndex',
    data() {
        return {
            user: {
                mobile: '',
                code: '',
            },
            is_time: false,//是否显示倒计时
            time: 60000,//倒计时
            //校验规则
            userRules: {
                mobile: [{ required: true, message: '手机号不能为空' }, {
                    pattern: /^1[3-9]\d{9}$/,
                    message: '手机号格式错误'
                }],
                code: [{ required: true, message: '验证码不能为空' },
                {
                    pattern: /^\d{6}$/,
                    message: '验证码格式错误'
                }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        //登录按钮
        async onSubmit() {
            console.log('点击了登录按钮');
            console.log('type', this.user, typeof (this.user.code));
            this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0,//如果为0 则持续展示
            });
            try {
                const res = await loginApi(this.user)
                console.log('登录成功', res);
                this.setUser(res.data.data)
                this.$toast.success('登录成功')
                this.$router.push('/my')

            } catch (err) {
                console.log('登录失败', err);
                if (err.response.status === 400) {
                    console.log('手机号或验证码错误');
                    this.$toast.fail('手机号或验证码错误')

                } else {
                    console.log('登录失败');
                    this.$toast.fail('登录失败')

                }

            }

        },
        //发送验证码
        async sendBtn() {
            //1.校验手机号
            this.$refs.loginForm.validate('mobile').then(res => {
                console.log('验证成功');
            }).catch(err => {
                console.log('验证失败', err);
                return
            })
            console.log('打印手机号', this.user.mobile);
            //2.显示倒计时
            this.is_time = true
            try {
                //3.请求发送验证码(接口)
                await sendMsgApi(this.user.mobile)
                this.$toast('发送成功')
                console.log('发送成功');
            } catch (err) {
                console.log('发送失败', err);
                if (err.response.status === 429) {
                    this.$toast.fail('发送频繁,请稍后重试')
                } else {
                    this.$toast.fail('发送失败,请稍后重试')

                }

            }

        },
    }
}
</script>

<style >
.van-nav-bar__title {
    color: #fff !important;
}

.login-container .iconfont {
    font-size: 37px;
}

.login-container .send_btn {
    background-color: #ededed !important;

    height: 50px;
    line-height: 50px;

}
</style>