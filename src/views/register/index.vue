<template>
   <div class="container">
    <div class="hrForm">
      <div class="choice" ref="choice">
        <p @click="changeTabs(false)">我要找工作</p>
        <p @click="changeTabs(true)">我要招聘</p>
      </div>
      <el-form :model="hrInfo" status-icon :rules="hrrules" ref="hrInfo" label-width="100px" class="hrruleForm">
        <el-form-item  prop="username">
          <el-input type="text" v-model="hrInfo.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="hrInfo.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass">
          <el-input type="password" v-model="hrInfo.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model.number="hrInfo.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
        <el-input v-model.number="hrInfo.code"  style="width: 270px;padding-right: 10px;" placeholder="验证码"></el-input>
          <el-button  @click="sendCode">{{this.msg}}</el-button>
        </el-form-item>
        <div v-if="isHr">
          <el-form-item prop="company">
             <el-autocomplete
              class="choose"
              v-model="hrInfo.company"
              :fetch-suggestions="querySearch"
              placeholder="请输入就职公司"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
           <div @click="changeClick" class="tips" v-if="tipsShow">没有您所在的公司？请添加</div>
        </div>
        <el-form-item prop="email">
          <el-input v-model="hrInfo.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="registerBtn" @click="hrSubmit('hrInfo')">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="introduceCompany">
        <img src="../../assets/logo.png" @click="toIndex"/>
         <p>Job-hunting and recruitment oriented to the Internet,
           providing more internship and job opportunities
           From now on, thumb up your life, start with this job.</p>
      </div>
      <div class="footer-tip3" @click="toLogin">
           已有账号?直接登录
    </div>
    </div>
    <el-dialog title="公司信息" :visible.sync="dialogShow">
      <el-form :model="companyInfo" class="companyForm">
      <el-form-item  :label-width="formLabelWidth">
        <el-input v-model="companyInfo.name" auto-complete="off" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item  :label-width="formLabelWidth">
        <el-input v-model="companyInfo.address" auto-complete="off" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item  :label-width="formLabelWidth">
        <el-input v-model="companyInfo.avatar" auto-complete="off" placeholder="logo"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-input v-model="companyInfo.introduce" auto-complete="off" placeholder="简介"></el-input>
      </el-form-item>
      <el-form-item  :label-width="formLabelWidth">
        <el-input v-model="companyInfo.scale" auto-complete="off" placeholder="规模"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-input v-model="companyInfo.type" auto-complete="off" placeholder="类型"></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogShow = false">取 消</el-button>
    <el-button type="primary" @click="submitCompanyInfo">确 定</el-button>
  </div>
</el-dialog>
<img class="bg_bottom" src="../../assets/bg_bottom.png"/>
<img class="bg_bottom2" src="../../assets/bg_bottom2.png"/>
  </div>
</template>

<script>
import fetch from '../../api/fetch'
    export default {
        name:'register',
         data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"))
      } else {
        callback()
      }
    }
    var checkCompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择公司"))
      } else {
        return callback()
      }

    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"))
      } else {
        callback()
      }
    }
    var validUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.hrInfo.checkPass !== "") {
          this.$refs.hrInfo.validateField("checkPass")
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.hrInfo.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      msg: "发送验证码",
      count: "",
      timer: null,
      show: true,
      confirmCode: "",
      companyId: "",
      isHr: false,
      options: [],
      dialogShow: false,
      tipsShow: false,
      companyInfo: {
        name: '',
        avatar: '',
        introduce: '',
        scale: '',
        type: ''
      },
      formLabelWidth: '120px',
      hrInfo: {
        password: "",
        checkPass: "",
        phone: "",
        username: "",
        email: "",
        company: "",
        code: ""
      },
      hrrules: {
        code: [{validator: checkCode, trigger: "blur"}],
        company: [{validator: checkCompany, trigger: "blur"}],
        username: [{validator: validUsername, trigger: "blur"}],
        password: [{validator: validatePass, trigger: "blur"}],
        checkPass: [{validator: validatePass2, trigger: "blur"}],
        phone: [{validator: checkPhone, trigger: "blur"}],
        email: [{validator: checkEmail, trigger: "blur"}]
      }
    }
  },

  mounted() {
    this.getCompany()
    this.addAnimation()
  },

  methods: {
    addAnimation() {
      let form = document.getElementsByClassName('hrForm')[0]
      form.classList.add('animated')
      form.classList.add('bounceInDown')
    },

    sendCode() {
      const TIME_COUNT = 60
      fetch
        .sendCode(this.hrInfo.phone)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              $message({
                message: '发送成功',
                type: 'success'
              })
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.msg = this.count + "s后发送"
            if (this.count === 0) {
              this.msg = '发送验证码'
            }
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    hrSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.tipsShow) {
          let result = {
            email: this.hrInfo.email,
            password: this.hrInfo.password,
            phone: this.hrInfo.phone,
            username: this.hrInfo.username,
            code: this.hrInfo.code,
          }
          // hr注册
          if (this.isHr) {
            result.companyId = this.companyId;
            fetch.hrRegister(result).then(res => {
            if (res.status == 200) {
                if (res.data.code === 0) {
                  this.$message({
                    message: "注册成功",
                    type: "success"
                  });
                  this.$router.push({ name: "login" });
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                   });
                }
               }
            }).catch(e => {
            console.log(e)
          })
        } else {

        // 用户注册
        fetch
          .userRegister(result)
          .then(res => {
            if (res.status == 200) {
              if (res.data.code === 0) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                this.$router.push({ name: "login" });
                } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                  });
                }
               }
            })
            .catch(e => {
              this.$message({
                message: "注册失败",
                type: "warning"
              });
            });
        }
        }
      })
    },

    // 获取公司职位名称
    getCompany() {
      fetch
        .getCompany()
        .then(res => {
          for (let item of res.data.data.companyList) {
            this.options.push({value: item.name, label: item.id})
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    toLogin() {
      this.$router.push({name: "login"})
    },

    // 公司查询
    querySearch(queryString, cb) {
        var options = this.options;
        var results = queryString ? options.filter(this.createFilter(queryString)) : options;
        // 调用 callback 返回建议列表的数据
        console.log('ressshs', results)
        if (results.length === 0) {
          this.tipsShow = true;
        } else {
          this.tipsShow = false;
        }
        cb(results);
    },

    createFilter(queryString) {
        return (option) => {
          return (option.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },
    // 选择公司
    handleSelect(item) {
      this.companyId = item.label;
    },
    // 控制添加公司弹窗显示
    changeClick() {
      this.dialogShow = true;
    },
    // 提交公司信息
    submitCompanyInfo() {
      fetch.addCompany(this.companyInfo).then(res => {
          if (res.data.code === 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.push({ name: "login" });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                  });
            }
      })
      console.log(this.companyInfo)
    },
    // 注册切换角色
    changeTabs(isHr) {
      if (!isHr) {
        this.$refs.choice.firstChild.style.fontWeight = '700'
         this.$refs.choice.lastChild.style.fontWeight = '400'
      } else {
        this.$refs.choice.firstChild.style.fontWeight = '400'
        this.$refs.choice.lastChild.style.fontWeight = '700'
      }
      this.isHr = isHr;
    },
    toIndex() {
      this.$router.push({name: 'index'})
    }
  }
    }
</script>

<style scope>
@import "../../assets/Animate/animate.min.css";
  html * {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    border: 1px solid #ededed;
    width: 100%;
    background: linear-gradient(#4c4c4c, #7f7f7f);
    background-size: 100% 100%;
    min-height: 100vh;
  }

  .choice {
    text-align: left;
    padding-left: 100px;
  }

  .choice p{
    display: inline-block;
    width: 173px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #5a5a5a;
  }

  .choice p:first-child {
    border-right: 1px solid #ededed;
    font-weight: 700;
  }

  .hrForm {
    background: #fff;
    border: 1px solid #ededed;
    width: 840px;
    height: 650px;
    margin: 150px auto 150px auto;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
    padding-top: 36px;
    position: relative;
  }

  .el-form-item__content {
    /* margin-bottom: 22px; */
    margin-left: 0px !important;
  }


  .hrruleForm {
    width: 500px;
    position: relative;
    top: 14px;
    left: -14px;
    padding: 14px 14px 14px 100px;
  }

  .choose {
    width: 100%;
  }

  .footer-tip3{
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    color: #5a5a5a;
  }

  .registerBtn {
    width: 100%;
  }

  .tips {
    margin-top: -20px;
    text-align: left;
    cursor: pointer;
    color: red;
    font-size: 14px;
  }

  .bg_bottom {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .bg_bottom2 {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .introduceCompany {
    color: #5f6368;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    height: 600px;
    padding: 30px 30px 0 0;
  }

  .introduceCompany img {
    width: 300px;
    height: 300px;;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .companyForm {
    padding: 0 66px;
  }
</style>