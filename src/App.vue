<template>
    <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4082418_tu4og9zsya.css" />
    <router-view></router-view>
</template>

<script>
import { ref, onMounted, inject } from "vue";

export default {
    name: "App",
    components: {},
    setup() {
        let clientWidth = ref(document.body.clientWidth);
        let resizeTimer = null;
        // 100是字体大小，1920是开发时浏览器窗口的宽度，等比计算
        let rootFontSize = 100 * (clientWidth.value / 1990);
        // 获取全局变量
        const globalVal = inject("globalVal");

        function changeFontSize() {
            rootFontSize = 100 * (globalVal.clientWidth / 1990);
            if (rootFontSize > 100) {
                document.documentElement.style.fontSize = 100 + "px";
            } else if (rootFontSize < 53.125) {
                document.documentElement.style.fontSize = 53.125 + "px";
            } else {
                document.documentElement.style.fontSize = rootFontSize + "px";
            }
        }
        onMounted(() => {
            setTimeout(() => {
                changeFontSize();
            }, 300);
            window.onresize = () => {
                return (() => {
                    // 监听页面宽度变化，动态改变全局变量
                    globalVal.clientWidth = document.body.clientWidth;
                    // rem根据屏幕宽度，改变html字体大小配置
                    changeFontSize();
                })();
            };
        });

        return {
            clientWidth,
            resizeTimer,
            rootFontSize,
            globalVal
        };
    }
};
</script>

<style>
/*每个页面公共css */
html {
    font-size: 100px;
}
body {
    font-size: 14px;
    margin: 0;
    padding: 0;
}
</style>
