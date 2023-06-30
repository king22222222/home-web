<template>
    <view class="container">
        <view class="logo-box">
            <img class="logo" src="../assets/logo.png" />
            <view class="name">优义</view>
        </view>
        <view class="nav-list">
            <view class="nav-item" v-for="(item, index) in nvaList" :key="{ index }" @click="$emit('onBarClick', item.idName)">
                {{ item.name }}
            </view>
        </view>
    </view>
</template>
<script>
export default {
    setup() {
        let nvaList = [
            {
                name: "首页",
                idName: "indexBanner"
            },
            {
                name: "智能家居",
                idName: "deviceShow"
            },
            {
                name: "网站开发",
                idName: "webDev"
            },
            {
                name: "电路板设计",
                idName: "pcb"
            },
            {
                name: "联系我们",
                idName: "contact"
            }
        ];

        return {
            nvaList
        };
    }
};
</script>
<style>
.container {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 12px 11px 0px rgba(0, 0, 0, 0.15);
    background-color: #fff;
}

.logo-box {
    display: flex;
    align-items: center;
}

.logo {
    padding-right: 0.12rem;
    width: 0.4rem;
    height: 0.4rem;
}

.name {
    font-size: 0.32rem;
    font-weight: 600;
    font-family: cursive;
    white-space: nowrap;
}

.nav-list {
    display: flex;
    font-size: 0.18rem;
}

.nav-item {
    margin: 0 40px;
    padding: 5px;
    cursor: pointer;
    white-space: nowrap;
}
</style>
