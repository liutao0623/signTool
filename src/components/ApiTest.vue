<!-- 组件说明 -->
<template>
  <div class>
    <el-button type="primary" round @click="getInfo">获取polyv数据</el-button>
    <el-button type="primary" round @click="getData">获取聚合的数据</el-button>
    <div v-for="(item,k) in list" :key="k">
      <h1>author_name--{{item.author_name}}</h1>
      <h2>title--{{item.title}}</h2>
      <h2>category--{{item.category}}</h2>
      <h3>date--{{item.date}}</h3>
      <img :src="item.thumbnail_pic_s" alt />
    </div>
  </div>
</template>
<script>
import API_URL from "../api/api.js";
export default {
  components: {},
  data() {
    return {
      list: [],
      appId:'fl688o41og',
      appSecret:'039ce475e7df4225ae5d410a38638370'
    };
  },
  created() {},
  computed: {},
  methods: {
    getSign(){
              var sign
              //将参数提炼成 {a:1,b:2} 形式
              var mustParams = {
                appId: this.appId,
                timestamp: new Date().getTime(),
              }
              var str = this.appSecret
              //加密之前的参数
              var tempArr = Object.keys(mustParams).sort();
              for (var i in tempArr) {
                str = `${str}` + `${tempArr[i]}` + `${mustParams[tempArr[i]]}`
              }
              var reStr = str + this.appSecret;
              return sign = this.$md5(reStr).toLocaleUpperCase()
    },
    getData() {
      this.$api.get(
        API_URL.getData,
        {
          key: "7b4eb0ad97ec05a69154f85332704672",
          type: "top",
          ts:new Date().getTime()
        },
        (res) => {
          this.list = res.result.data;
        }
      );
    //   $.ajax({
    //     url: `http://v.juhe.cn/toutiao/index?key=7b4eb0ad97ec05a69154f85332704672&type=top`,
    //      dataType : "jsonp",//数据类型为jsonp  
	  // 	jsonp : "jsonpCallback",//服务端用于接收callback调用的function名的参数
    //  }).done(function (res) {
    //     if (res.code == 200) {
    //          this.list = res.result.data;
    //     }
    //   });
    },
    getInfo(){
       this.$api.get(
        API_URL.getInfo,
        {
          appId: this.appId,
          timestamp:new Date().getTime(),
          sign:this.getSign()
        },
        (res) => {
          console.log(res)
        }
      );
    }
  },
};
</script>

<style scoped>
/* @import url() */
</style>