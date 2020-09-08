<!-- 单点登录的demo -->
<template>
  <div class="demo">
    <el-form :model="form" :rules="rules" label-width="200px" ref="form">
      <el-form-item label="单点登录demo" prop="region">
        <el-select v-model="form.region" placeholder="请选择单点登录的场景" @change="onSelectedDrug">
          <el-option :label="item.name" :value="item.value" v-for="(item,i) in ssoArray" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="appId" prop="appId" required>
        <el-input v-model="form.appId"></el-input>
      </el-form-item>
      <el-form-item label="appSecret" prop="appSecret" required>
        <el-input v-model="form.appSecret"></el-input>
      </el-form-item>
      <el-form-item label="userId" prop="userId" required v-if="form.region == 'user'">
        <el-input v-model="form.userId"></el-input>
      </el-form-item>
      <el-form-item label="channelId" prop="channelId" required v-if="form.region == 'webStart'">
        <el-input v-model="form.channelId"></el-input>
      </el-form-item>
      <el-form-item label="accountlId" prop="accountlId" required v-if="form.region == 'account'">
        <el-input v-model="form.accountlId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('form')">测试登录</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <el-form-item></el-form-item>
    </el-form>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: "Sso",
  data() {
    //这里存放数据
    return {
      form: {
        // region: "user",
        // appId: "fl688o41og",
        // appSecret: "039ce475e7df4225ae5d410a38638370",
        // userId: "197f27ca73",
        // channelId: "1851682",
        // accountlId: "0021843380",

        region: "user",
        appId: "",
        appSecret: "",
        userId: "",
        channelId: "",
        accountlId: "",
      },
      rules: {
        appId: [{ required: true, message: "请输入AppID", trigger: "blur" }],
        appSecret: [
          { required: true, message: "请输入appSecret", trigger: "blur" },
        ],
        userId: [{ required: true, message: "请输入userId", trigger: "blur" }],
        channelId: [
          { required: true, message: "请输入channelId", trigger: "blur" },
        ],
        accountlId: [
          { required: true, message: "请输入accountlId", trigger: "blur" },
        ],
      },
      ssoArray: [
        { name: "后台登录", value: "user" },
        { name: "网页开播", value: "webStart" },
        { name: "助教登录", value: "account" },
      ],
      sign: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let appId = this.form.appId;
          let appSecret = this.form.appSecret;
          let userId = this.form.userId;
          let accountlId = this.form.accountlId;
          let channelId = this.form.channelId;
          let nickname = "测试";
          let token = "tom";
          let timestamp = new Date().getTime();
          let param = {
            appId: appId,
            appSecret: appSecret,
            token: token,
            timestamp: timestamp,
          };
          let sign = this.$md5(this.config.getSign(param)).toLocaleUpperCase();
          let url, callbackUrl, redirect;
          let role = this.form.region;
          switch (role) {
            case "user":
              //设置账户单点登录的token
              url = `https://api.polyv.net/live/v3/user/set-sso-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}`;
              redirect = `https://live.polyv.net/#/channel/`;
              callbackUrl = `https://live.polyv.net/v2/sso/userLogin.do?userId=${userId}&token=${token}&redirect=${redirect}`;
              break;
            case "webStart":
              //设置频道单点登录的token
              url = `https://api.polyv.net/live/v2/channels/${channelId}/set-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}&nickname=${nickname}`;
              redirect = `https://live.polyv.net/web-start/classroom?channelId=${channelId}`;
              callbackUrl = `https://live.polyv.net/teacher/auth-login?channelId=${channelId}&token=${token}&redirect=${redirect}`;
              break;
            default:
              //设置子频道单点登录的token
              url = `https://api.polyv.net/live/v2/channels/${accountlId}/set-account-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}`;
              redirect = "https://live.polyv.net/assistant.html";
              callbackUrl = `https://live.polyv.net/teacher/auth-login?channelId=${channelId}&token=${token}&redirect=${redirect}`;
              break;
          }
          $.ajax({
            url: url,
          }).done(function (res) {
            if (res.code == 200) {
              window.open(callbackUrl);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      //   if (role == "user") {
      //     url = `https://api.polyv.net/live/v3/user/set-sso-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}`;
      //     redirect = `https://live.polyv.net/#/channel/`;
      //     callbackUrl = `https://live.polyv.net/v2/sso/userLogin.do?userId=${userId}&token=${token}&redirect=${redirect}`;
      //   } else if (role == "webStart") {
      //     url = `https://api.polyv.net/live/v2/channels/${channelId}/set-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}`;
      //     redirect = `https://live.polyv.net/web-start/classroom?channelId=${channelId}`;
      //     callbackUrl = `https://live.polyv.net/teacher/auth-login?channelId=${channelId}&token=${token}&redirect=${redirect}`;
      //   } else {
      //     url = `https://api.polyv.net/live/v2/channels/${accountlId}/set-account-token?appId=${appId}&timestamp=${timestamp}&token=${token}&sign=${sign}`;
      //     redirect = "https://live.polyv.net/assistant.html";
      //     callbackUrl = `https://live.polyv.net/teacher/auth-login?channelId=${channelId}&token=${token}&redirect=${redirect}`;
      //   }

      // this.$api.get(API_URL.setToken+channelId+'/set-account-token?',{
      //             appId: appId,
      //             timestamp: timestamp,
      //             token:token,
      //             sign:sign,
      //         }, (res) => {
      //             if(res.code == 200){
      //                 window.open(callbackUrl)
      //             }else{
      //                 console.log(res)
      //             }
      //         })
    },
    onSelectedDrug(e) {
      // console.log(e)
      this.resetForm("form");
      this.form.region = e
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // $.ajax({
    //   url: ` http://api.polyv.net/live/v1/users/${userId}/channels`,
    //   data: {},
    // }).done(function (res) {
    //   if (res.code == 200) {
    //     window.open(callbackUrl);
    //   }
    // });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.demo{
  margin: 8px;
  width: 40%;
}
</style> 