<template>
    <div class="container">
        <div class="registerForm">
            <img src="../../assets/logo_1.png" class="logo" @click="backIndex"/>
                <el-form :model="loginInfo" status-icon :rules="rules2" ref="loginInfo" label-width="100px" class="loginForm">
                    <!-- prop：表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
                    <!-- model：表单数据对象 -->
                    <!-- rules：表单验证规则 -->
                    <!-- status-icon属性可显示状态图标 -->
                  <div class="marg">
                    <el-form-item  prop="username">
                      <el-input type="text" v-model="loginInfo.username" auto-complete="off" class="loginInput" placeholder="用户名"></el-input>
                      <!-- auto-complete自动提示组件 -->
                    </el-form-item>
                  </div>
                  <div class="marg">
                    <el-form-item  prop="password">
                      <el-input type="password" v-model="loginInfo.password" auto-complete="off" class="loginInput" placeholder="密码"></el-input>
                    </el-form-item>
                  </div>
                  <div class="marg">
                    <el-form-item>
                      <el-button class="loginBtn" @click="submitForm('loginInfo')" >登录</el-button>
                    </el-form-item>
                  </div>
                </el-form>
            <div class="footer-tip" @click="toRegister">
             没有账号？直接注册
            </div>
        </div>
    <img class="bg_bottom" src="../../assets/bg_bottom.png"/>
    <img class="bg_bottom2" src="../../assets/bg_bottom2.png"/>
  </div>
</template>

<script>
import fetch from '../../api/fetch'
    export default {
        data () {
      var validUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
            return {
        loginInfo: {
          password: '',
          username: ''
        },
        rules2: {
          username: [{validator: validUsername, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}]
        }
      }
    },
        methods:{
           addAnimation() {
        let form = document.getElementsByClassName('registerForm')[0];
        form.classList.add('animated')
        form.classList.add('bounceInDown')
      },
      backIndex () {
        this.$router.push({name: 'index'})
      },
      toRegister () {
        this.$router.push({name: 'register'})
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            fetch
              .userLogin(this.loginInfo)
              .then(res => {
                            if (res.status === 200) {
                                if (res.data.success === true) {
                                    localStorage.setItem('token', res.data.data.token)
                                    localStorage.setItem('companyId', res.data.data.companyId)
                                    localStorage.setItem('role', res.data.data.role)
                                    sessionStorage.setItem('userId', res.data.data.userId)
                                        if (res.data.data.role === 2) {
                                            this.$router.push({name: 'userInfo', params: {refresh: 1}})
                                            } else {
                                                this.$router.push({name: 'hrView', params: {hrRefresh: 2}})
                                            }
                                        } else {
                                            this.$message({
                                                message: '用户名或密码错误',
                                                type: 'warning'
                                            })
                                        }
                                    }
                        //    if (this.loginInfo.username === 'admin' && this.loginInfo.password === '123') {
                        //         this.$notify({
                        //             type: 'success',
                        //             message: '欢迎你,' + this.loginInfo.username + '!',
                        //             duration: 3000 
                        //         })
                        //         this.$router.push('userInfo')
                        //     } else {
                        //         this.$message({
                        //             type: 'error',
                        //             message: '用户名或密码错误',
                        //             showClose: true
                        //         })
                        //     }

                        })
                        .catch(e => {
                            console.log(e)
                        })
                    }
                })
            }
        },
        mounted(){
            this.addAnimation()
        }
        
    }
</script>

<style scoped>
@import "../../assets/Animate/animate.min.css";
    html * {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    border: 1px solid #ededed;
    background: linear-gradient(#4c4c4c, #7f7f7f);
    background-size: 100% 100%;
    min-height: 100vh;
  }

  .registerForm {
    background: #fff;
    border: 1px solid #ededed;
    width: 450px;
    height: 320px;
    margin: 250px auto 250px auto;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
    position: relative;
  }

  .marg{
    margin-bottom: 22px;
  }
    
  .loginForm {
    padding: 0 36px;
  }

  .loginInput {
    width: 100%;
  }

  .footer-tip {
    color: #5a5a5a;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    bottom: 16px;
    right: 16px;
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

  .logo {
    width: 150px;
    height: 80px;
    cursor: pointer;
    opacity: 0.7;
  }

  .loginBtn {
    width: 100%;
    height: 40px;
  }

</style>