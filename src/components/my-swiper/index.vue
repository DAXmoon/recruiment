<template>
    <div class="container">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrap">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in swiperData" :key="index">
                <img :src="item.img" :alt="item.img" class="swiper-img">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data(){
             return {
                swiperOption: {
                    //分页器
                     pagination:{
                        //绑定dom元素
                        el:'.swiper-pagination'
                    }
                },
                swiperData:[
                    {img: 'https://sxsimg.xiaoyuanzhao.com/3C/09/3C4A275077015CBF398443CC21774709.png'},
                    {img: 'https://sxsimg.xiaoyuanzhao.com/C3/55/C35273E2AAA17DBA580304E05DF22155.png'},
                    {img: 'https://sxsimg.xiaoyuanzhao.com/C6/FC/C60F54D6D175ABAF3E9A33F0FDE867FC.png'},
                    {img: 'https://sxsimg.xiaoyuanzhao.com/FD/0C/FDBBBD21A98136E3054ADDD432A5020C.png'}
                ]       
            }
        },
        components:{
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped lang="scss">
    .swiper-wrap {
        position: relative;
        width: 1200px;
        margin: 20px auto 30px auto;
        box-shadow: 0 10px 15px #888;
        border-radius: 6px;
        .swiper-img{
            width: 100%;
            height: 100%;
            border-radius: 6px;
        }
    }

</style>