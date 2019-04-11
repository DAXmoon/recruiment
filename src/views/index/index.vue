<template>
    <div class="container">
        <Header/>
        <MySwiper/>
        <Company/>
        <Jobs/>
        <About/>
    </div>
</template>

<script>
import MySwiper from '@/components/my-swiper'
import Header from '@/components/header'
import Company from '@/components/company'
import Jobs from '@/components/jobs'
import About from '@/components/about'
    export default {
        name:'index',
        components:{
            MySwiper,
            Header,
            Company,
            Jobs,
            About
        }
    }
</script>

<style scoped lang="scss">

</style>