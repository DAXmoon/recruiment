<template>
    <div class="container">
        <Header/>
        <MySwiper/>
        <Company/>
    </div>
</template>

<script>
import MySwiper from '@/components/my-swiper'
import Header from '@/components/header'
import Company from '@/components/company'
    export default {
        name:'index',
        components:{
            MySwiper,
            Header,
            Company
        }
    }
</script>

<style scoped lang="scss">

</style>