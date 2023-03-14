<template>
    <div>
        <van-cell class="articleBox" :to="'/article/' + obj.art_id">
            <!-- 标题 -->
            <div slot="title" class="title van-multi-ellipsis--l2">{{ obj.title }}</div>


            <!-- 文字提示 -->
            <div slot="label">
                <!-- 三张图片 -->
                <div v-if="obj.cover.type === 3" class="timgBox">
                    <div class="coverItem" v-for="imgsrc in obj.cover.images">
                        <van-image class="imgbox" :src="imgsrc" fit="cover" />
                    </div>

                </div>
                <div class="label_info">
                    <span>{{ obj.aut_name }}</span>
                    <span>{{ obj.comm_count }}评论</span>
                    <span>{{ obj.pubdate | relativeTime }}</span>
                </div>
            </div>
            <!-- 一张封面 -->
            <van-image fit="cover" class="imgbox" v-if="obj.cover.type === 1" slot="default" :src="obj.cover.images[0]" />
        </van-cell>
    </div>
</template>

<script>
export default {
    props: {
        obj: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.articleBox .title {
    font-size: 32px;
    color: #3a3a3a;
}

.articleBox .van-cell__value {
    flex: unset;
    padding-left: 25px;
}

.coverItem .imgbox {
    width: 100%;
    height: 146px;
}

.coverItem {
    flex: 1;
    height: 146px;


}

.coverItem:not(:last-child) {
    padding-right: 4px;
}

.articleBox .imgbox {
    width: 232px;
    height: 146px;
}

.timgBox {
    display: flex;
    padding: 30px 0;
}

.label_info span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
}
</style>