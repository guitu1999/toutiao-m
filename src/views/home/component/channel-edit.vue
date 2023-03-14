<template>
    <div class="edit_box">
        <!-- 我的频道 -->
        <van-cell>
            <div slot="title" class="title_box">我的频道</div>
            <van-button @click="is_edit = !is_edit" class="edit_btn" type="danger" plain round size="small">{{
                !is_edit ? '编辑' : '完成' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item @click="MychannelBtn(obj, index)" class="grid_item" v-for="(obj, index) in channels"
                :key="index">
                <van-icon v-show="is_edit && obj.id != 0" slot="icon" name="clear"></van-icon>
                <span slot="text" :class="{ now_channel: index == channel_index }" class="text">{{ obj.name }}</span>
            </van-grid-item>
        </van-grid>
        <!-- 频道推荐 -->
        <van-cell>
            <div slot="title" class="title_box">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10" class="recomend">
            <van-grid-item icon="plus" class="grid_item" v-for="obj in recommendList">
                <span @click="addChannel(obj)" slot="text" class="text">{{ obj.name }}</span>

            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
import { channelsApi, addChannellApi, delChannelApi } from '@/api/index.js';
import { mapState } from 'vuex';
import { setItem } from '@/utils/storage.js'
export default {
    props: {
        channels: {
            type: Array,
            required: true
        },
        channel_index: {
            type: Number
        }
    },
    data() {
        return {
            ChannelAllList: [],//所有频道列表
            is_edit: false,//是否编辑
        }
    },
    computed: {
        //用户登录状态
        ...mapState(['user']),
        //频道推荐列表
        recommendList() {
            const channels = []
            this.ChannelAllList.forEach((item, index) => {
                //find找到满足条件的元素项
                const ret = this.channels.find((mychannel) => {
                    return mychannel.id === item.id
                })
                if (!ret) {
                    channels.push(item)
                }
            })
            console.log('打印推荐列表', channels);
            return channels
        }
    },
    created() {
        this.loadAllChannel()
    },
    methods: {
        //加载全部频道列表
        async loadAllChannel() {
            try {
                const { data } = await channelsApi()
                console.log('所有频道', data);
                this.ChannelAllList = data.data.channels
            } catch (err) {

            }
        },
        //添加频道
        async addChannel(obj) {
            console.log('点击il添加频道', obj);
            this.channels.push(obj)
            //数据持久化处理
            if (this.user) {
                try {
                    //已登录 把数据请求接口放到线上
                    await addChannellApi({
                        id: obj.id,//频道id
                        seq: this.channels.length,//序号
                    })
                } catch (err) {
                    console.log('添加失败');
                }

            } else {
                //未登录 把数据存储到本地
                setItem('TOUTIAO_CHANNELS', this.channels)
            }

        },
        //点击我的频道方法
        MychannelBtn(obj, index) {
            //推荐列表不删除
            if (index == 0) {
                return
            }
            console.log('点击我的频道', index, this.channel_index);
            //编辑状态 删除频道
            if (this.is_edit) {

                if (index < this.channel_index) {
                    this.$emit('changeIndex', this.channel_index - 1, true)
                }
                //不指定索引  默认从索引删除到最后
                this.channels.splice(index, 1)
                this.del_channels(obj.id)
            } else {
                //非编辑状态 切换频道
                this.$emit('changeIndex', index)
            }

        },
        //删除频道方法
        async del_channels(id) {
            if (this.user) {
                await delChannelApi(id)
            } else {
                setItem('TOUTIAO_CHANNELS', this.channels)
            }
        }
    }
}
</script>

<style scoped>
.edit_box {
    padding-top: 85px;
}

.title_box {
    font-size: 32px;
    color: #333;
}

.edit_btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
}

.grid_item {
    width: 160px;
    height: 86px;
}

/deep/.van-grid-item__content {
    background-color: #f4f5f6;
    white-space: nowrap;


}

/deep/.van-grid-item__text,
.text {
    font-size: 28px;
    color: #222;
    margin-top: 0;
}

/deep/ .recomend .van-grid-item__content {
    flex-direction: row;
}

/deep/.recomend .van-grid-item__content .van-grid-item__icon {
    font-size: 24px;
}

/deep/.recomend .van-grid-item__content .van-grid-item__text {
    margin-top: 0;
    margin-left: 6px;
}

/deep/ .van-icon-clear,
van-icon {
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 35px;
    color: #cacaca;
    z-index: 2;
}

.now_channel {
    color: red;
}

/deep/.van-grid-item__icon-wrapper {
    position: unset;
}
</style>