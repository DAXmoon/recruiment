<template>
    <header>
        <div class="container">
            <div class="wrap">
                <span class="tab" @click="index">首页</span>  
                <el-input v-model="input" placeholder="搜素职位" class="search" clearable>
                     <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div class="lore">
                    <span class="tab" @click="login">登录</span>
                    <span class="tab" @click="register">注册</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data(){
            return{
                input:''
            }
        },
        methods:{
            index(){
                this.$router.push({name: 'index'})
            },
            login(){
                this.$router.push({name: 'login'})
            },
            register(){
                this.$router.push({name: 'register'})
            }
        }
        
        
    }
</script>

<style scoped lang="scss">
    html * {
    padding: 0;
    margin: 0;
    }
    * {
    box-sizing: border-box;
    }
    header {
        width: 100%;
        height: 60px;
        background:rgba(0,0,0,0.8); 
        .container{
            display: flex;
            justify-content: space-between;
            margin: auto;
            line-height: 60px;
            .wrap{
                padding-left: 100px;
            }
            .tab{
                font-size: 16px;
                color: #fff;
                margin: 10px;
                padding: 6px;
                border-radius: 4px;
            }
            .search{
                width: 300px;
                margin-left:20px; 
            }
            .lore{
                display: inline-block;
                padding-left: 600px
            }
        }
    }
</style>