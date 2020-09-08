<template>
  <div class="body">
    <el-row>
      <el-col :span="10" style="margin-right: 40px;">
        <el-form :model="allDataForm" ref="allDataForm" label-width="100px" class="demo-dynamic">
          <el-form-item prop="type">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  签名生成规则:
                </div>
              </el-col>
              <el-col :span="12">
                <el-select v-model.trim="allDataForm.type" placeholder="请选择签名类型" @change="onSelectedDrug()">
                  <el-option label="点播" value="vod"></el-option>
                  <el-option label="直播" value="live"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 必填值（appSecret/secretkey） -->
          <el-form-item @input="removeSpaces" v-if="allDataForm.type == 'live'" label="appSecret" prop="appSecret"
            :rules="{
          required: true, message: '请填写值appSecret', trigger: 'blur'
        }">
            <el-input v-model.trim="allDataForm.appSecret"></el-input>
          </el-form-item>

          <el-form-item @input="removeSpaces" v-else label="secretkey" prop="secretkey" :rules="{
          required: true, message: '请填写secretkey', trigger: 'blur'
        }">
            <el-input v-model.trim="allDataForm.secretkey"></el-input>
          </el-form-item>
          <!-- 必填值（appId/userId） -->
          <el-form-item @input="removeSpaces" v-if="allDataForm.type == 'live'" label="appId" prop="appId" :rules="{
            required: true, message: '请填写值appId', trigger: 'blur'
          }">
            <el-input v-model.trim="allDataForm.appId"></el-input>
          </el-form-item>

          <!-- <el-form-item @input="removeSpaces" v-else label="userid" prop="userid" :rules="{
            required: true, message: '请填写userId', trigger: 'blur'
          }">
             <el-input v-model.trim="allDataForm.userid"></el-input>
          </el-form-item> -->
          <!-- 必填值（timestamp/ptime） -->
          <el-form-item @input="removeSpaces" v-if="allDataForm.type == 'live'" label="timestamp" prop="timestamp"
            :rules="{
          required: true, message: '请填写值timestamp', trigger: 'blur'
        }">
            <el-row>
              <el-col :span="12">
                <el-input v-model.trim="allDataForm.timestamp"></el-input>
              </el-col>
              <el-col :span="6" style="margin-left: 20px;">
                <el-button type="info" @click="getTime()">获取当前时间戳</el-button>
              </el-col>
            </el-row>

          </el-form-item>

          <el-form-item @input="removeSpaces" v-else label="ptime" prop="ptime" :rules="{
          required: true, message: '请填写ptime', trigger: 'blur'
        }">
            <el-row>
              <el-col :span="12">
                <el-input v-model.trim="allDataForm.ptime"></el-input>
              </el-col>
              <el-col :span="6" style="margin-left: 20px;">
                <el-button type="info" @click="getTime()">获取当前时间戳</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <div v-for="(item, index) in allDataForm.params" :key="index">
            <el-row>
              <el-col :span="10">
                <el-form-item @input="removeSpaces" :label="'参数名' + (index+1)" :prop="'params.'+ index  +'.Pname' "
                  :rules="{
                required: true, message: '请填写参数名', trigger: 'blur'
              }">
                  <el-input v-model.trim="item.Pname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item @input="removeSpaces" :label="'参数值' + (index+1)" :prop="'params.'+ index  +'.Pvalue'"
                  :rules="{
                required: true, message: '请填写参数值', trigger: 'blur'
              }">
                  <el-input v-model.trim="item.Pvalue"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button @click.prevent="removeDomain(item)" style="margin-left: 20px;">删除</el-button>
              </el-col>
            </el-row>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm( 'allDataForm' )">提交</el-button>
            <el-button @click="addDomain">新增参数</el-button>
            <el-button @click="resetForm('allDataForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="result">
          <div>
            <span style="color:#409eff"> 参与签名的参数: </span>{{ objParams }}
          </div>
          <div style="word-wrap:break-word;">
            <span style="color:#409eff"> 拼接后的字符串： </span> {{reStr}}
          </div>
          <!-- <div>
            <span style="color:#409eff"> 生成的签名：  </span>  {{allDataForm.sign}}
           </div> -->
          <div>
            <el-form ref="form" label-width="180px">
              <el-form-item @input="removeSpaces" label="生成的签名">
                <el-input v-model.trim="allDataForm.sign" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item @input="removeSpaces" label="客户的签名">
                <el-input v-model.trim="elseSign"></el-input>
              </el-form-item>
              <el-button type="success" @click="checkSign">对比</el-button>
              <el-form-item @input="removeSpaces" label="匹配">
                <el-input v-model.trim="isTrue" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Side',
    data() {
      return {
        reStr: "",
        allDataForm: {
          appSecret: '',
          appId: '',
          timestamp: '',
          // userid:'',
          secretkey: '',
          ptime: '',
          type: "live",
          params: [{
            Pname: "",
            Pvalue: ""
          }]
        },
        objParams: {},
        sign: "",
        elseSign: "",
        isTrue: ""
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //直播加密规则
            if (this.allDataForm.type == 'live') {
              console.log(this.allDataForm)
              this.objParams = {}
              //将参数提炼成 {a:1,b:2} 形式
              var mustParams = {
                appId: this.allDataForm.appId,
                timestamp: this.allDataForm.timestamp,
              }
              this.allDataForm.params.length !=0?
              this.allDataForm.params.forEach((item, index) => {
                this.objParams = { ...mustParams, ...this.objParams, ...{ [item.Pname]: item.Pvalue } };
              }):this.objParams= mustParams

              var str = this.allDataForm.appSecret
              //加密之前的参数
              var tempArr = Object.keys(this.objParams).sort();
              for (var i in tempArr) {
                str = `${str}` + `${tempArr[i]}` + `${this.objParams[tempArr[i]]}`
              }
              var reStr = str + this.allDataForm.appSecret;
              this.reStr = reStr;
              this.allDataForm.sign = this.$md5(reStr).toLocaleUpperCase()
            } else {
              //将参数 按照参数名字典顺序排列，用“&”连接参数名与参数值,并在最后加上secretkey的值，生成40位大写的SHA1值，作为sign。
              this.objParams = {}
              //将参数提炼成 {a:1,b:2} 形式
              var mustParams = {
                // userid  : this.allDataForm.userid,
                ptime: this.allDataForm.ptime,
              }
              this.allDataForm.params.length!=0?
              this.allDataForm.params.forEach((item, index) => {
                this.objParams = { ...mustParams, ...this.objParams, [item.Pname]: item.Pvalue };
              }):this.objParams = mustParams;
              var str = ""
              //加密之前的参数
              var tempArr = Object.keys(this.objParams).sort();
              for (var i in tempArr) {
                str = str + `${tempArr[i]}` + '=' + `${this.objParams[tempArr[i]]}` + '&'
              }
              //去除最后一个&
              str = str.slice(0, str.length - 1)
              var reStr = str + this.allDataForm.secretkey;
              this.reStr = reStr;
              this.allDataForm.sign = this.utils.sha1(reStr).toLocaleUpperCase()
            }
          } else {
            console.log('error submit!!');
            console.log(this.utils.sha1('a').toLocaleUpperCase())
            return false;
          }
        });
      },
      resetForm(formName) {
        var temFlag = this.allDataForm.type
        this.$refs[formName].resetFields();
        if (temFlag == 'vod') {
          this.allDataForm.type = 'vod'
        } else {
          this.allDataForm.type = 'live'
        }
      },
      removeDomain(item) {
        var index = this.allDataForm.params.indexOf(item)
        if (index !== -1) {
          this.allDataForm.params.splice(index, 1)
        }
      },
      addDomain() {
        this.allDataForm.params.push({
          Pname: '',
          Pvalue: '',
        });
      },
      getTime() {
        this.allDataForm.type == 'live' ? this.allDataForm.timestamp = new Date().getTime() : this.allDataForm.ptime = new Date().getTime()
      },
      onSelectedDrug() {
        this.resetForm('allDataForm');
        this.objParams = {}
        this.reStr = ""
        this.allDataForm.sign = ""
        this.allDataForm.params = [{
          Pname: "",
          Pvalue: ""
        }]
        this.isTrue = ""
        this.elseSign = ""
      },
      checkSign() {
        if (this.allDataForm.sign == this.elseSign) {
          this.isTrue = "一致"
        } else {
          this.isTrue = "不一致"
        }
      },
      removeSpaces(event) {
        if (event.target.composing) {
          return
        }
        this.value = event.target.value.trim()
        this.value = this.value.replace("\\u200B", "")
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .result {
    border: 1px solid #E4E6E9;
    background-color: #F9FAFC;
    padding: 20px 33px;
    border-radius: 4px;
  }
</style>