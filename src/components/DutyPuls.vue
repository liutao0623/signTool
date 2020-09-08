<!-- 组件说明 -->
<template>
  <div class="body">
    <el-row>
      <el-col :span="8" style="margin-right: 40px;">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="一组" prop="name.name1">
            <el-select v-model="form.name.name1" multiple placeholder="请选择">
              <el-option
                v-for="item in one"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二组" prop="name.name2">
            <el-select v-model="form.name.name2" multiple placeholder="请选择">
              <el-option
                v-for="item in two"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三组" prop="name.name3">
            <el-select v-model="form.name.name3" multiple placeholder="请选择">
              <el-option
                v-for="item in three"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="技术支持" prop="tes">
            <el-select v-model="form.tes" multiple placeholder="请选择">
              <el-option
                v-for="item in te"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="智齿值班" prop="sobot">
            <el-select v-model="form.sobot" multiple placeholder="请选择">
              <el-option v-for="(item,i) in form.sobots" :key="i" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值班时间" prop="date">
            <el-col :span="10">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                style="width: 100%;"
                :picker-options="form.pickerOptions0"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="时间段" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="早班"></el-radio>
              <el-radio label="中班"></el-radio>
              <el-radio label="晚班"></el-radio>
              <el-radio label="全班"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form :model="query" ref="query" label-width="100px" class="demo-ruleForm">
          <el-col :span="8">
            <el-form-item>
              <el-date-picker v-model="query.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="query.type" placeholder="请选择类型">
                <el-option label="早班" value="早班"></el-option>
                <el-option label="午班" value="午班"></el-option>
                <el-option label="晚班" value="晚班"></el-option>
                <el-option label="全班" value="全班"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="query()">查询</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import API_URL from "../api/api.js";
export default {
  components: {},
  data() {
    return {
      form: {
        date: "",
        type: "",
        name: {
          name1: [],
          name2: [],
          name3: [],
        },
        sobot: [],
        sobots: [],
        tes: [],
        technology: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
          },
        },
      },
      query: {
        date: "",
        type: "",
      },
      rules: {
        type: [
          { required: true, message: "请选择值班时间段", trigger: "change" },
        ],
        sobot: [
          { required: true, message: "请选择智齿值班人员", trigger: "change" },
        ],
        "name.name1": [
          { required: true, message: "请选择一组值班人员", trigger: "change" },
        ],
        "name.name2": [
          { required: true, message: "请选择二组值班人员", trigger: "change" },
        ],
        "name.name3": [
          { required: true, message: "请选择三组值班人员", trigger: "change" },
        ],
        tes: [{ required: true, message: "请选择值班人员", trigger: "change" }],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
      },

      one: [
        {
          value: "叶润凯",
          label: "叶润凯",
        },
        {
          value: "黄子健",
          label: "黄子健",
        },
        {
          value: "黎慧华",
          label: "黎慧华",
        },
        {
          value: "贺修培",
          label: "贺修培",
        },
        {
          value: "王建",
          label: "王建",
        },
      ],

      sobot1: [],
      oneObj: [],

      two: [
        {
          value: "鲁毅",
          label: "鲁毅",
        },
        {
          value: "吴甜",
          label: "吴甜",
        },
        {
          value: "刘韬",
          label: "刘韬",
        },
        {
          value: "彭国",
          label: "彭国",
        },
        {
          value: "赵泽",
          label: "赵泽",
        },
      ],

      sobot2: [],
      twoObj: [],

      three: [
        {
          value: "彭茗",
          label: "彭茗",
        },
        {
          value: "范竹佳",
          label: "范竹佳",
        },
        {
          value: "纪文幸",
          label: "纪文幸",
        },
        {
          value: "黄博",
          label: "黄博",
        },
        {
          value: "谢文军",
          label: "谢文军",
        },
        {
          value: "吕紫阳",
          label: "吕紫阳",
        },
      ],
      sobot3: [],
      threeObj: [],

      te: [
        {
          value: "炜彬",
          label: "炜彬",
        },
        {
          value: "永彬",
          label: "永彬",
        },
        {
          value: "锦雄",
          label: "锦雄",
        },
        {
          value: "杜晗",
          label: "杜晗",
        },
        {
          value: "诗雷",
          label: "诗雷",
        },
        {
          value: "超良",
          label: "超良",
        },
        {
          value: "展鸿",
          label: "展鸿",
        },
        {
          value: "佳乐",
          label: "佳乐",
        },
      ],
      tes: [],
    };
  },
  watch: {
    "form.name": {
      handler(n, o) {
        // console.log(n, o)
        let name1 = n.name1;
        let name2 = n.name2;
        let name3 = n.name3;
        this.form.sobots = [];
        this.form.sobots = this.form.sobots.concat(name1, name2, name3);
      },
      deep: true,
    },
  },
  created() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var one = this.isSobot(this.form.name.name1);
          var two = this.isSobot(this.form.name.name2);
          var three = this.isSobot(this.form.name.name3);
          // 技术支持
          var technology = [];
          var technologyObj = {};
          this.form.tes.forEach((e, j) => {
            technologyObj = { name: e, sobot: false };
            technology.push(technologyObj);
          });
          // console.log(technology);
          (this.form.one = one),
            (this.form.two = two),
            (this.form.three = three),
            (this.form.technology = technology);
          console.log(this.form);
          this.addData(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    addData(data) {
      this.$api.post(API_URL.addDuty, data, (res) => {
        this.$message({
          message: "添加数据成功",
          type: "success",
        });
      });
    },
    isSobot(person) {
      var oneObj = {};
      var result = [];
      person.forEach((e, j) => {
        oneObj = { name: e, sobot: false };
        result.push(oneObj);
      });
      this.form.sobot.forEach((i, k) => {
        person.forEach((item, j) => {
          if (item == i) {
            result[j].sobot = true;
          }
        });
      });
      return result;
    },
    query(){},
  },
};
</script>

<style scoped>
/* @import url() */
</style>