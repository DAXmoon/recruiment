<template>
    <div class="container">
        <Header/>
        <MySwiper/>
    </div>
</template>

<script>
import MySwiper from '@/components/my-swiper'
import Header from '@/components/header'
    export default {
        name:'index',
        components:{
            MySwiper,
            Header
        }
    }
</script>

<style scoped lang="scss">

</style>