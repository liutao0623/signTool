<!-- 组件说明 -->
<template>
    <div class=''>
        <div class="dowebok">
            <div class="container-login100">
                <div class="wrap-login100">
                    <div class="login100-pic js-tilt" data-tilt>
                        <img :src="image" alt="IMG">
                    </div>
                    <form class="login100-form validate-form">
                        <span class="login100-form-title">
                            会员登陆
                        </span>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" type="text" name="email" placeholder="邮箱">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="wrap-input100 validate-input">
                            <input class="input100" type="password" name="pass" placeholder="密码">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn">
                                登陆
                            </button>
                        </div>

                        <div class="text-center p-t-12">
                            <!-- <a class="txt2" href="javascript:">
                                忘记密码？
                            </a> -->
                        </div>

                        <div class="text-center p-t-136">
                            <!-- <a class="txt2" href="http://www.dmaku.com/" target="_blank">
                                    还没有账号？立即注册
                                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bgImg from '../assets/images/img-01.png'
    export default {
        components: {

        },
        data() {
            return {
                image: bgImg
            };
        },
        computed: {

        },
        methods: {

        },
    }
</script>

<style scoped>
    @import url('../assets/css/util.css');
    @import url('../assets/css/main.css');
    @import url('../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
</style>