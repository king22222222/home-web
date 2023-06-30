<template>
    <view class="img-contain" v-if="webType == 1">
        <img class="img" src="../../assets/web-design.jpg" />
    </view>
    <view class="img-contain" v-if="webType == 2">
        <img class="img" src="../../assets/manage-sys-design-index.gif" />
        <img class="img" src="../../assets/manage-sys-design-index2.gif" />
        <img class="img" src="../../assets/manage-sys-design-PC.png" />
        <img class="img" src="../../assets/manage-sys-design-PC2.png" />
        <img class="img" src="../../assets/manage-sys-design-phone.png" />
    </view>
    <view class="img-contain" v-if="webType == 3">
        <img class="img" src="../../assets/mini-program-design.jpg" />
    </view>
    <view class="img-contain" v-if="webType == 4">
        <img class="img" src="../../assets/app-design.png" />
    </view>
</template>
<script>
import { useRoute } from "vue-router";
export default {
    setup() {
        const route = useRoute();
        const webType = route.query.webType || 1;
        return {
            webType
        };
    }
};
</script>
<style>
.img-contain {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 50px;
}

.img-contain .img {
    width: 100%;
}
</style>
