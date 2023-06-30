<template>
    <div class="content">
        <!-- 联系浮窗 -->
        <view class="contact-box" :style="{ top: windowHeight / 2 + 'px' }" @mouseleave="onContactOut()">
            <view class="contact-dialog" v-if="showContactDialog">
                <view id="contactNum" v-if="contactList[curContactIndex].hasOwnProperty('phone')" class="phone-num">{{
                    contactList[curContactIndex].phone
                }}</view>
                <img id="contactCode" v-if="contactList[curContactIndex].hasOwnProperty('img')" class="code-img" :src="contactList[curContactIndex].img" />
            </view>
            <view class="contact-list">
                <view
                    class="contact-item"
                    v-for="(item, index) in contactList"
                    :key="{ index }"
                    @mouseover="onContactHover(index)"
                    @click="onCantactCopy(index)"
                >
                    <view class="contact-icon iconfont" :class="item.icon"></view>
                    <view class="contact-type">{{ item.title }}</view>
                </view>
            </view>
        </view>
        <!-- 返回顶部 -->
        <view class="back-top iconfont icon-up" @click="onBackTopClick"> </view>
        <!-- 导航栏 -->
        <topBar class="bar" @onBarClick="onBarClick"></topBar>
        <!-- 首页图片 -->
        <div id="indexBanner" class="index-content">
            <img class="index-img" src="../../assets/index-img.jpg" />
        </div>
        <!-- 设备展示 -->
        <div id="deviceShow" ref="deviceshow" class="device-show-box" :style="{ height: windowHeight + 'px', backgroundSize: '100% ' + windowHeight + 'px' }">
            <div class="title-box" id="deviceTitleBgDown">
                <div class="bg-box">
                    <div class="title-bg"></div>
                    <div class="title-bg2"></div>
                </div>
                <div class="title" :class="deviceTitleDownAnimation ? 'device-text-down' : ''">住进AI未来家</div>
            </div>
            <!-- 特效：类似小度官网设备的效果，鼠标悬浮图片翻转，描述转出。 -->
            <div class="device-content">
                <img class="device-img animate__animated" :class="{ animate__fadeInUp: deviceAnimation }" src="../../assets/device-show.gif" />
            </div>
        </div>
        <!-- <div>{{ windowWidth }} {{ windowHeight }}</div> -->
        <!-- 应用场景 -->
        <div class="scene-cotent" ref="scene">
            <div class="scene-left">
                <div class="describe-top">
                    <div class="text animate__animated" :class="{ animate__fadeInUp: sceneAnimation }">个性化定制</div>
                    <div class="text animate__animated" :class="{ animate__fadeInUp: sceneAnimation }">无忧售后</div>
                    <div class="line"></div>
                </div>
                <div class="describe-bottom animate__animated">
                    <div class="title animate__animated">应用场景</div>
                    <div class="describe animate__animated">全屋智能商用产品面向酒店、办公、地产、家居、民宿等多行业场景</div>
                </div>
            </div>
            <div class="scene-item animate__animated" v-for="(item, index) in sceneList" :key="{ index }" :class="{ animate__fadeInUp: sceneAnimation }">
                <img class="img" :src="item.img" />
                <div class="img-describe" :style="{ background: item.background }">
                    <div class="title">{{ item.title }}</div>
                    <div class="describe">{{ item.descrobe }}</div>
                    <div class="keyword-list">
                        <div class="keyword-item" v-for="(keyword, keywordIndex) in item.keyword" :key="{ keywordIndex }">{{ keyword.word }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务支持 -->
        <div class="service-bg">
            <div class="service-content" ref="service">
                <div class="service-left">
                    <div class="service-list">
                        <div
                            class="service-item animate__animated"
                            v-for="(item, index) in serviceList"
                            :key="{ index }"
                            :class="{ animate__fadeInUp: serviceAnimation }"
                        >
                            <div :class="item.icon" class="iconfont"></div>
                            <div class="service-title-box">
                                <div class="serial-num">0{{ index + 1 }}.</div>
                                <div class="title">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <video
                    class="service-right animate__animated"
                    src="../../assets/room-ctrl.mp4"
                    :controls="false"
                    autoplay
                    muted
                    loop
                    :class="{ animate__fadeInUp: serviceAnimation }"
                ></video>
            </div>
        </div>
        <!-- 网站开发 -->
        <div id="webDev" class="web-dev-content" ref="web">
            <div class="web-dev-title animate__animated" :class="{ animate__slideInLeft: webAnimation }">网站开发</div>
            <div class="web-dev-list">
                <div class="web-dev-item" v-for="(item, index) in webDevList" :key="{ index }" @click="onWebDevItemClick(item.typeId)">
                    <img
                        class="web-dev-img"
                        :src="item.img"
                        v-if="(index + 1) % 2 != 1"
                        :style="(index + 1) % 2 == 1 ? 'padding-right: 0rem' : 'padding-right: 0.5rem'"
                    />
                    <div class="web-dev-text" ref="web" :style="(index + 1) % 2 == 1 ? 'padding-right: 0.5rem' : 'padding-right: 0rem'">
                        <div
                            class="web-dev-item-title animate__animated"
                            :class="{ animate__fadeInUp: webAnimation }"
                            :style="{ background: 'url(' + require('../../assets/0' + (index + 1) + '.png') + ') no-repeat' }"
                            style="background-size: auto 100%"
                        >
                            {{ item.title }}
                        </div>
                        <div class="web-dev-introduce animate__animated" :class="{ animate__fadeInUp: webAnimation }">{{ item.introduce }}</div>
                    </div>
                    <img class="web-dev-img animate__animated" :class="{ animate__fadeInUp: webAnimation }" :src="item.img" v-if="(index + 1) % 2 == 1" />
                </div>
            </div>
        </div>
        <!-- 电路板设计 -->
        <view id="pcb" class="pcb-design-content">
            <view class="pcb-opt-box animate__animated" :class="{ animate__fadeInUp: pcbAnimation }" ref="pcb">
                <view class="pcb-opt-list">
                    <view
                        class="pcb-opt-item"
                        :class="index == curPcbOptIndex ? 'pcb-opt-item-active' : ''"
                        v-for="(item, index) in pcbOptList"
                        :key="{ index }"
                        @mouseover="onPcbOptItemClick(index)"
                    >
                        <view v-if="item.titleIcon" class="opt-title-icon iconfont" :class="item.titleIcon"></view>
                        <img v-if="item.titleIconImg" class="opt-title-icon-img" :src="item.titleIconImg" />
                        <view class="opt-title">{{ item.title }}</view>
                    </view>
                </view>
                <view class="pcb-show-box">
                    <img class="opt-img" :src="pcbOptList[curPcbOptIndex].img" />
                    <view class="opt-desc-cover">
                        <view class="opt-desc">{{ pcbOptList[curPcbOptIndex].desc }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 联系我们 -->
        <view id="contact" class="contact-us-content">
            <view class="contact-title animate__animated" :class="{ animate__fadeInUp: contactAnimation }" ref="contact">联系方式</view>
            <view class="contact-detail-list">
                <view
                    class="contact-detail-item animate__animated"
                    :class="{ animate__fadeInUp: contactAnimation }"
                    v-for="(item, index) in contactDeatilList"
                    :key="index"
                >
                    <img class="left" :src="item.img" />
                    <view class="right" v-if="item.hasOwnProperty('detail')">
                        <view class="contact-type-title">{{ item.title }}</view>
                        <view class="contact-detail">{{ item.detail }}</view>
                    </view>
                    <img class="wechat-code" v-if="item.hasOwnProperty('wechatCode')" :src="item.wechatCode" />
                </view>
            </view>
        </view>
        <view class="get-quote-box">
            <view class="quote-title">免费获取报价方案</view>
            <view class="contact-form-list">
                <view class="contact-form-item" v-for="(item, index) in contactFormList" :key="index">
                    <view class="from-icon iconfont" :class="item.icon"></view>
                    <input class="input" type="text" :name="item.title" :value="item.value" :placeholder="item.placeholder" />
                </view>
            </view>
            <view class="phone-code">
                <view class="text">获取验证码</view>
                <view class="tips" v-if="showGetCodeCount">{{ getCodeCount }}秒后重发</view>
            </view>
            <view class="get-quote-btn">免费获取</view>
        </view>
    </div>
</template>

<script>
import topBar from "../../components/topBar.vue";
import { ref, onMounted, watch, inject } from "vue";
import { useRouter } from "vue-router";
export default {
    components: {
        topBar
    },
    setup() {
        const myref = ref(null);
        const router = useRouter();
        let windowHeight = ref(window.innerHeight);
        let windowWidth = ref(document.body.clientWidth);
        let widthTimer = false; // 监听窗口宽度变化防抖
        let deviceTitleBgDownAnimation = false;
        let deviceTitleDownAnimation = false;
        let showContactDialog = ref(false); // 联系浮窗信息弹窗
        let contactList = [
            {
                title: "电话",
                icon: "icon-phone",
                phone: "18024557364"
            },
            {
                title: "微信",
                icon: "icon-wechat",
                img: require("../../assets/wx-code.jpg")
            }
        ];
        let curContactIndex = ref(0); // 当前浮动的联系浮窗下标
        let sceneList = [
            {
                img: require("../../assets/smart-home.png"),
                title: "智能家居",
                descrobe: "语音/远程控制家中门锁、窗户、窗帘、灯光系统、空调、电视、投影仪。应用：智慧地产、智能办公室、智慧展厅",
                keyword: [{ word: "睡眠模式" }, { word: "观影模式" }, { word: "语音控制" }, { word: "小程序控制" }],
                background: "#58657c"
            },
            {
                img: require("../../assets/smart-hotel.png"),
                title: "智慧酒店",
                descrobe: "网上预订自助机无人入住、语音客房控制、客房呼叫服务。应用：文旅定制、智慧景区、智能酒店",
                keyword: [{ word: "场景定制" }, { word: "插卡取电" }, { word: "智能中控" }],
                background: "#a19fa2"
            }
        ];
        let serviceList = [
            {
                icon: "icon-communicate",
                title: "售后服务"
            },
            {
                icon: "icon-measure",
                title: "上门勘测"
            },
            {
                icon: "icon-design",
                title: "方案设计"
            },
            {
                icon: "icon-sign",
                title: "合同签订"
            },
            {
                icon: "icon-construction",
                title: "施工对接"
            },
            {
                icon: "icon-install",
                title: "安装调试"
            },
            {
                icon: "icon-check",
                title: "竣工验收"
            },
            {
                icon: "icon-service",
                title: "无忧售后"
            }
        ];
        let webDevList = [
            {
                title: "官方网站开发",
                introduce: "公司网站建设、购物商城营销平台；响应式布局：PC、平板、电脑、手机多平台完美呈现",
                img: require("../../assets/web-cover.webp"),
                typeId: 1
            },
            {
                title: "后台管理系统",
                introduce: "pms后台管理系统，企业信息管理与监控、业务办理、实物处理等",
                img: require("../../assets/management-system-cover.webp"),
                typeId: 2
            },
            {
                title: "小程序开发",
                introduce: "电商、餐饮、营销、预约小程序，拥有多维度、传播力强等优势",
                img: require("../../assets/miniapp-cover.webp"),
                typeId: 3
            },
            {
                title: "app开发",
                introduce: "应用领域广泛，企业放心之选，安卓/IOS通用",
                img: require("../../assets/app-cover.webp"),
                typeId: 4
            }
        ];
        let pcbOptList = [
            {
                title: "电路板设计",
                titleIconImg: require("../../assets/pcb-icon.png"),
                desc: "pcb设计、制板、SMT贴片、元器件采购、代码烧录一站式开发服务",
                img: require("../../assets/pcb-show.png")
            },
            {
                title: "单片机开发",
                titleIcon: "icon-cpu",
                desc: "即微型处理器(MCU)，单片机开发就是编写一个小系统烧录到芯片上，让微型处理器工作，也是嵌入式开发的一部分",
                img: require("../../assets/singlechip-show.png")
            },
            {
                title: "服务器开发",
                titleIcon: "icon-server",
                desc: "根据您的物联网设备类型，提供嵌入式设备的后台服务器开发，保证其网络的稳定性和多并发的访问",
                img: require("../../assets/server-show.png")
            }
        ];
        let curPcbOptIndex = ref(0);
        let contactDeatilList = [
            {
                img: require("../../assets/phone.png"),
                title: "电话",
                detail: "18024557364"
            },
            {
                img: require("../../assets/wechat.png"),
                title: "微信",
                wechatCode: require("../../assets/wx-code.jpg")
            },
            {
                img: require("../../assets/local.png"),
                title: "地址",
                detail: "佛山市南海区狮山镇狮中村小文洞坑兴业路253号"
            }
        ];
        let contactFormList = [
            {
                icon: "icon-people",
                title: "联系人",
                value: "",
                placeholder: "联系人"
            },
            {
                icon: "icon-phone2",
                title: "联系方式",
                value: "",
                placeholder: "联系方式"
            },
            {
                icon: "icon-save",
                title: "验证码",
                value: "",
                placeholder: "验证码"
            }
        ];
        let showGetCodeCount = false; // 显示获取手机验证码倒计时
        let getCodeCount = ref(0);
        // 获取元素top距离
        const deviceshow = ref(null);
        const scene = ref(null);
        const service = ref(null);
        const web = ref(null);
        const pcb = ref(null);
        const contact = ref(null);
        // 动画列表
        const deviceAnimation = ref(null);
        const sceneAnimation = ref(null);
        const serviceAnimation = ref(null);
        const webAnimation = ref(null);
        const pcbAnimation = ref(null);
        const contactAnimation = ref(null);
        let throttle = null; // 滚动监听节流
        let deviceImgAnimation = false; // 首页图片

        onMounted(() => {
            window.addEventListener("scroll", () => {
                let pageYOffset = window.pageYOffset;
                if (pageYOffset >= deviceshow.value.offsetTop / 3) {
                    deviceAnimation.value = true;
                }
                if (pageYOffset >= scene.value.offsetTop / 3) {
                    sceneAnimation.value = true;
                }
                if (pageYOffset >= service.value.offsetTop / 3) {
                    serviceAnimation.value = true;
                }
                if (pageYOffset >= web.value.offsetTop / 3) {
                    webAnimation.value = true;
                }
                if (pageYOffset >= pcb.value.offsetTop / 3) {
                    pcbAnimation.value = true;
                }
                if (pageYOffset >= contact.value.offsetTop / 3) {
                    contactAnimation.value = true;
                }
            });
        });

        // 动态获取全局数据l里的屏幕宽度变化
        const globalVal = inject("globalVal");
        watch(
            () => globalVal.clientWidth,
            (newVal) => {
                if (!widthTimer) {
                    windowWidth.value = newVal;
                    widthTimer = true;
                    setTimeout(() => {
                        widthTimer = false;
                    }, 500);
                }
            }
        );

        // 联系弹窗鼠标hover
        const onContactHover = (index) => {
            showContactDialog.value = true;
            curContactIndex.value = index;
        };

        // 点击联系item，复制联系号码
        const onCantactCopy = () => {
            let copyString = "18024557364";
            let eInput = document.createElement("input");
            eInput.value = copyString;
            document.body.appendChild(eInput);
            eInput.select(); //选择对象
            document.execCommand("Copy"); //执行浏览器的复制命令
            eInput.style.display = "none";
            alert("复制成功");
        };

        // 点击返回顶部按钮
        const onBackTopClick = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };

        // 点击导航栏
        const onBarClick = (idName) => {
            const target = document.querySelector("#" + idName);
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        };

        // 联系弹窗鼠标移出
        const onContactOut = () => {
            showContactDialog.value = false;
        };

        const onWebDevItemClick = (typeId) => {
            // 新页面打开
            const href = router.resolve({
                path: "/webshow",
                query: { webType: typeId }
            });
            window.open(href.href, "_blank");
            // 在当前页面打开
            // router.push({
            //     path: "/webshow",
            //     query: { webType: typeId }
            // });
        };

        const onPcbOptItemClick = (index) => {
            curPcbOptIndex.value = index;
        };

        return {
            myref,
            windowHeight,
            windowWidth,
            deviceTitleBgDownAnimation,
            deviceTitleDownAnimation,
            showContactDialog,
            contactList,
            curContactIndex,
            sceneList,
            serviceList,
            webDevList,
            pcbOptList,
            curPcbOptIndex,
            contactDeatilList,
            contactFormList,
            showGetCodeCount,
            getCodeCount,
            throttle,
            deviceImgAnimation,
            deviceshow,
            scene,
            service,
            web,
            pcb,
            contact,
            deviceAnimation,
            sceneAnimation,
            serviceAnimation,
            webAnimation,
            pcbAnimation,
            contactAnimation,
            onContactHover,
            onCantactCopy,
            onBackTopClick,
            onBarClick,
            onContactOut,
            onWebDevItemClick,
            onPcbOptItemClick
        };
    }
};
</script>

<style>
@import "../../animation.css";
.content {
    width: 100%;
}

/* 联系浮窗 */
.contact-box {
    position: fixed;
    z-index: 10;
    right: 0;
    display: flex;
}

.contact-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contact-list .contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem 0.3rem;
    color: #fff;
    background-color: #878787;
    opacity: 0.8;
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 12px 1px rgba(0, 0, 0, 0.2);
}

.contact-list .contact-item:first-child {
    border-top-left-radius: 0.2rem;
}

.contact-list .contact-item:last-child {
    border-bottom-left-radius: 0.2rem;
}

.contact-list .contact-item .iconfont {
    padding-bottom: 0.04rem;
    font-size: 0.25rem;
}

.contact-list .contact-item .contact-type {
    font-size: 0.15rem;
}

.contact-box .contact-dialog {
    padding: 0.2rem;
    height: fit-content;
    background-color: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
}

.contact-dialog .phone-num,
.code-img {
    width: 100%;
    color: #303133;
    letter-spacing: 0.01rem;
}

.contact-dialog .code-img {
    height: 1.5rem;
}

/* 返回顶部 */
.back-top {
    z-index: 10;
    position: fixed;
    right: 0;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.25rem;
    font-size: 0.35rem !important;
    color: #fff;
    background-color: #878787;
    opacity: 0.8;
    cursor: pointer;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 4px 12px 1px rgba(0, 0, 0, 0.2);
}

/* 导航栏 */
.bar {
    position: fixed;
    z-index: 10;
}

/* 首页图片 */
.index-content {
    z-index: 1;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 60px;
    background: #fff;
}
.index-img {
    width: 100%;
    max-width: 20rem;
}

/* 设备展示 */
.device-show-box {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../../assets/device-show-bg.png) no-repeat;
    width: 100%;
}

.device-show-box > .title-box {
    position: relative;
    width: 100%;
}

.title-box .bg-box {
    position: relative;
    overflow: hidden;
    width: 100%;
}

.bg-box .title-bg,
.title-bg2 {
    width: 100%;
    height: 2rem;
    background-image: url(../../assets/dec1.png);
    background-repeat: repeat-x;
    background-position: left bottom;
    background-size: 20% 3rem;
    transform: translateY(0) rotateX(180deg);
    animation: deviceBgdown 3s ease infinite;
}

.title-bg2 {
    top: 0;
    left: 0;
    position: absolute;
    width: 200%;
    overflow: hidden;
    transform: translateY(-2rem) rotateX(180deg);
    animation: deviceBgdown 3s ease 1.5s infinite;
}

.title-box .title {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    background: radial-gradient(139.19% 135.43% at 40.37% 28.4%, #acc5e2 0%, rgba(172, 197, 226, 0) 100%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    /* color: #b2c8e2; */
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.1rem;
    white-space: nowrap;
}

.device-content {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.device-img {
    width: 16rem;
}

/* 场景 */
.scene-cotent {
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding-top: 1.48rem;
    padding-bottom: 1rem;
    background: url(../../assets/device-bg.png) no-repeat;
    background-size: cover;
    width: 100%;
    height: 7rem;
    max-height: 1080px;
}

.scene-left {
    box-sizing: border-box;
    flex-shrink: 0;
    padding-left: 0.7rem;
    padding-right: 0.4rem;
    max-width: 750px;
    width: 7.5rem;
    height: 100%;
}

.scene-left .describe-top {
    margin-top: 1rem;
    width: 100%;
}

.scene-left .describe-top .text,
.scene-left .describe-top.line,
.scene-left .describe-bottom .title {
    width: 100%;
    background: radial-gradient(139.19% 135.43% at 40.37% 28.4%, #acc5e2 0%, rgba(172, 197, 226, 0) 100%);
    background-clip: text;
    font-size: 0.75rem;
    font-weight: 800;
    color: transparent;
    letter-spacing: 0.08rem;
}

.scene-left .describe-top .line {
    margin: 0.5rem 0;
    width: 0.9rem;
    height: 0.025rem;
    background: linear-gradient(0deg, #5f6e80, #5f6e80), #191c21;
}

.scene-left .describe-bottom {
    width: 100%;
}

.scene-left .describe-bottom .title {
    margin-bottom: 0.1rem;
    font-size: 0.4rem;
    letter-spacing: 0.02rem;
}

.scene-left .describe-bottom .describe {
    font-size: 0.22rem;
    font-weight: 400;
    color: #fff;
    letter-spacing: 0.05rem;
    opacity: 0.6;
}

.scene-item {
    flex-shrink: 0;
    margin-right: 0.4rem;
    width: 4rem;
    max-width: 400px;
    min-width: 250px;
}

.scene-item .img {
    width: 100%;
    height: 40%;
    border-top-left-radius: 0.28rem;
    border-top-right-radius: 0.28rem;
}

.scene-item .img-describe {
    box-sizing: border-box;
    padding: 0 0.2rem;
    width: 100%;
    border-bottom-left-radius: 0.28rem;
    border-bottom-right-radius: 0.28rem;
    color: #fff;
}

.scene-item .img-describe .title {
    padding: 0.2rem 0;
    font-size: 0.35rem;
    letter-spacing: 0.04rem;
}

.scene-item .img-describe .describe {
    height: 0.77rem;
    font-size: 0.16rem;
    opacity: 0.8;
    letter-spacing: 0.02rem;
    line-height: 0.25rem;
}

.scene-item .img-describe .keyword-list {
    overflow: hidden;
    padding-top: 0.2rem;
    width: 100%;
    height: 1.96rem;
}

.scene-item .img-describe .keyword-item {
    float: left;
    margin-right: 0.12rem;
    margin-bottom: 0.14rem;
    padding: 0.1rem 0.14rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.16rem;
    font-weight: 800;
    letter-spacing: 0.02rem;
    border-radius: 0.3rem;
}

/* 服务支持 */
.service-bg {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #f5f5f5;
}

.service-content {
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
    width: 96%;
    max-width: 1760px;
}

.service-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    min-width: 340px;
}

.service-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
}

.service-list .service-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    margin: 40px 0;
    width: calc(100% / 4);
}

.service-list .service-item .iconfont {
    font-size: 0.5rem;
    color: #719ebc;
    font-weight: 600;
}

.service-list .service-item .service-title-box {
    display: flex;
    align-items: baseline;
    margin-top: 0.35rem;
    font-size: 0.22rem;
    color: #303133;
}

.service-list .service-item .service-title-box .serial-num {
    font-size: 0.25rem;
    font-family: cursive;
    color: #7f7f7f;
}

.service-right {
    width: 40%;
    height: 100%;
    min-width: 390px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    object-fit: cover;
}

/* 网站开发 */
.web-dev-content {
    width: 100%;
    background: url(../../assets/web-dev-bg.png) no-repeat;
    background-size: cover;
}

.web-dev-content .web-dev-title {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 1rem;
    padding: 0.6rem 0;
    padding-right: 1rem;
    width: 6rem;
    line-height: 0.58rem;
    font-weight: 700;
    font-size: 0.6rem;
    color: #a99387;
    background: url(../../assets/title-bg.png) no-repeat;
    background-size: cover;
    background-position: center;
    letter-spacing: 0.04rem;
    border-top-right-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
}

.web-dev-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.7rem 3rem;
    width: 100%;
}

.web-dev-list .web-dev-item {
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    width: 100%;
    max-width: 1760px;
}

.web-dev-list .web-dev-item:first-child {
    padding-top: 0;
}

.web-dev-item .web-dev-text {
    box-sizing: border-box;
    padding-right: 0.5rem;
    width: 50%;
    min-width: 320px;
    cursor: pointer;
}

.web-dev-item .web-dev-text .web-dev-item-title {
    box-sizing: border-box;
    padding-top: 0.3rem;
    padding-left: 0.6rem;
    height: 1.2rem;
    color: #a99387;
    font-size: 0.5rem;
    font-weight: 700;
    background: url(../../assets/01.png) no-repeat;
    background-size: auto 100%;
}

.web-dev-item .web-dev-text .web-dev-introduce {
    padding-top: 20px;
    line-height: 0.4rem;
    text-shadow: 0 0.04rem 0.06rem rgba(0, 0, 0, 0.08);
    font-weight: 400;
    font-size: 0.28rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 600;
    letter-spacing: 0.03rem;
}

.web-dev-item .web-dev-img {
    box-sizing: border-box;
    cursor: pointer;
    width: 6rem;
}

/* 电路设计 */
.pcb-design-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13rem;
    min-height: 10.8rem;
    min-width: 1020px;
    background: url(../../assets/pcb-bg.gif) no-repeat;
    background-size: 100% 100%;
}

.pcb-design-content .pcb-opt-box {
    display: flex;
    height: 8rem;
    width: 14rem;
}

.pcb-opt-box .pcb-opt-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: radial-gradient(139.19% 135.43% at 40.37% 28.4%, #acc5e2 0%, rgba(172, 197, 226, 0) 100%);
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
}

.pcb-opt-list .pcb-opt-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;
    color: #fff;
    cursor: pointer;
}

.pcb-opt-list .pcb-opt-item:first-child {
    border-top-left-radius: 60px;
}

.pcb-opt-list .pcb-opt-item:last-child {
    border-bottom-left-radius: 60px;
}

.pcb-opt-item .opt-title-icon {
    padding-bottom: 0.15rem;
    font-size: 0.5rem;
}

.pcb-opt-item .opt-title-icon-img {
    padding-bottom: 0.15rem;
    width: 0.5rem;
}

.pcb-opt-list .pcb-opt-item-active {
    background-color: rgba(110, 110, 110, 0.35);
}

.pcb-opt-list .opt-title {
    font-size: 0.25rem;
    white-space: nowrap;
}

.pcb-opt-box .pcb-show-box {
    position: relative;
    height: 100%;
    width: 100%;
}

.pcb-opt-box .opt-img {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.pcb-opt-box .opt-desc-cover {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.pcb-opt-box .opt-desc-cover .opt-desc {
    width: 65%;
    opacity: 0.9;
    line-height: 0.75rem;
    font-weight: 400;
    font-size: 0.4rem;
    color: #fff;
    letter-spacing: 0.04rem;
}

/* 联系我们 */
.contact-us-content {
    width: 100%;
}

.contact-us-content .contact-title {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.45rem 0;
    width: 15.85rem;
    min-width: 1080px;
    line-height: 0.9rem;
    font-family: "FZLTZHJW", sans-serif;
    font-weight: 600;
    font-size: 0.45rem;
    color: #4a4a4a;
    letter-spacing: 0.04rem;
    border-bottom: 1px solid #dcdfe6;
}

.contact-us-content .contact-detail-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 15.85rem;
    min-width: 1080px;
    border-bottom: 1px solid #e4e7ed;
}

.contact-detail-list .contact-detail-item {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0.7rem 0;
    margin-left: 0.3rem;
    border-right: 1px solid #e4e7ed;
}

.contact-detail-list .contact-detail-item:last-child {
    border: none;
}

.contact-detail-item .left {
    margin-right: 0.5rem;
    width: 1.2rem;
}

.contact-detail-item .right .contact-type-title {
    margin-bottom: 0.1rem;
    font-size: 0.25rem;
    font-weight: bold;
    color: #4a4a4a;
}

.contact-detail-item .right {
    display: flex;
    flex-direction: column;
}

.contact-detail-item .right .contact-detail {
    font-size: 0.2rem;
    color: #606266;
}

.contact-detail-item .wechat-code {
    width: 1.3rem;
}

.get-quote-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3rem;
    background: url(../../assets/contact-bg.gif) no-repeat;
    background-size: cover;
}

.get-quote-box .quote-title {
    margin-right: 1rem;
    font-size: 0.45rem;
    color: #fff;
    letter-spacing: 0.13rem;
    font-family: "FZLTXHJW", sans-serif;
    font-weight: 600;
    white-space: nowrap;
}

.get-quote-box .contact-form-list {
    display: flex;
    align-items: center;
    height: 0.6rem;
}

.contact-form-list .contact-form-item {
    display: flex;
    align-items: center;
    margin-right: 0.2rem;
    padding: 0 0.2rem;
    width: 2rem;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 6px;
    color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.contact-form-item:last-of-type {
    margin-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.contact-form-item .iconfont {
    margin-right: 0.1rem;
    font-size: 0.3rem;
}

.contact-form-item .input {
    padding: 0;
    width: 100%;
    border: none;
    background: none;
    outline: none;
    color: #fff;
    font-size: 0.18rem;
    font-weight: 600;
}

.contact-form-item .input::placeholder {
    color: #fff;
}

.get-quote-box .phone-code {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.2rem;
    height: 0.6rem;
    color: #fff;
    border: 1px solid #fff;
    border-left: none;
    border-radius: 6px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-size: 0.18rem;
    white-space: nowrap;
}

.get-quote-box .get-quote-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    padding: 0.15rem 0;
    color: #409eff;
    background: #fff;
    border-radius: 1rem;
    width: 2rem;
    font-size: 0.23rem;
    letter-spacing: 0.03rem;
    font-family: "FZLTXHJW", sans-serif;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    white-space: nowrap;
}
</style>
