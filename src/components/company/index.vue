<template>
    <div>
        <div class="title">
            <p>热门企业</p>
            <p>---Hot---</p>
        </div>
        <div class="company-card">
            <div class="card" v-for="(index,item) in companyList" :key="index">
                <img src="item.avatar" class="image"  @click="getCompanyDetail(item.id)">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'company',
        data(){
            return{
                companyList:[],
            }
        },
        methods:{
            getCompanyDetail(){
                localStorage.setItem('companyId',id)
                this.$router.push({name:'companyDetail'})
            }
        }
    }
</script>

<style scoped>

</style>