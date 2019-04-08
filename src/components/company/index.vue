<template>
    <div>
        <div class="title">
            <h3>热门企业</h3>
            <h3 style="color: #5a5a5a;font-weight: 400">---Hot---</h3>
        </div>
        <div class="container">
            
            <div class="company-card">
                <div class="card" v-for="(item,key) in companyList" :key="key">
                    <img :src="item.avatar" class="image" @click="getCompanyDetail(item.id)" >
                </div>
            </div>
        </div>  
         <div class="title">
            <h3>热门职业</h3>
            <h3 style="color: #5a5a5a;font-weight: 400">---JOBS---</h3>
        </div>
    </div>
    
</template>

<script>
import fetch from "../../api/fetch"
    export default {
        data(){
            return{
                company:'',
                companyList:[],
            }
        },
        methods:{
            getCompany () {
                fetch.getCompany().then(res => {
                    if (res.status === 200) {
                    this.companyList = res.data.data.companyList
                    console.log('res', res)
                }
            })
        },
            getCompanyDetail(){
                localStorage.setItem('companyId',id)
                this.$router.push({name:'companyDetail'})
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handler)
            this.getCompany()
        }
    }
</script>

<style scoped lang='scss'>
    .title{
        width: 100%;
        // height: 49px;
        margin: 30px  auto;
        text-align: center;
        padding-left: 10px;
        color: #000;
        background-color: #888;
        h3{
            margin: 0;
            padding: 0;
        }
    }
    .container{
        margin: 0 auto;
        width: 100%;
        height: 100%;
        background: #fff;
        width: 1200px;
        .company-card{
            width: 1200px;
            height:1000px;
            margin: 30px auto auto auto;
            padding-top: 30px; 
            .card{
                color: #07111B;
                font-size: 16px;
                width: 336px;
                height: 243px;
                float: left;
                margin: 30px;
                border-radius: 6px;
                .image{
                    border-radius: 6px 6px 0 0;
                    width: 100%;
                    height: 100%;
                    margin-bottom: 20px;
                    border-radius: 6px;
                }
            }
            .card:hover{
                transform: translateY(-5px);
                transition: 3ms;
                box-shadow: 5px 5px 10px #888;
            }
        }

    }
</style>