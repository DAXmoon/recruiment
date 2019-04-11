<template>
    <div>
        <div class="title">
            <h3>热门职业</h3>
            <h3 style="color: #5a5a5a;font-weight: 400">---JOBS---</h3>
        </div>
        <div class="newsContain">
            <div class="temp">
                <div class="newsItem"  v-for = "(item, key) in jobList" :key = "key" @click="jobDetail(item.recruit.id)">
                    <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                        <div class="flipper">
                            <span class="itemPic">{{item.company.name}}</span>
                            <span class="back">{{item.company.createTime}}</span>
                        </div>
                    </div>
                    <div>
                        <p>{{item.recruit.title}}</p>
                        <p style="margin-top:25px">{{item.recruit.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "../../api/fetch"
    export default {
        name:"jobs",
        data(){
            return{
                jobList: [],
            }
           
        },
        methods:{
            getJob () {
                fetch.findJob().then(res => {
                    if (res.status === 200) {
                        if (res.data.success === true) {
                            this.jobList = res.data.data.recruitList
                            }
                        }
                    }).catch(e => {
                        console.log(e)
                })
            },
            jobDetail (id) {
                // localStorage.setItem('jobId', id)
                this.$router.push({name: 'jobInfo'})
            },

        },
        mounted(){
            window.addEventListener('scroll', this.handler)
        //     this.getCompany()
            this.getJob()
        //     this.getRecommand()
        }
    }
</script>

<style lang="scss" scoped>
    .title{
        width: 100%;
        // height: 49px;
        margin: 30px  auto;
        text-align: center;
        padding-left: 10px;
        color: #ededed;
        background-color: #888;
        h3{
            margin: 0;
            padding: 0;
        }
    }
    .newsContain {
        padding-top: 1px;
        width: 100%;
        height: 100%;
        background: #fff;
        .newsItem {
            display: flex;
            justify-content: flex-start;
            width: 1200px;
            margin: auto;
            height: 114px;
            text-align: left;
            color: #5a5a5a;
            font-weight: 500;
            padding-top: 15px;
            border-bottom: 1px solid #ededed;
            .picContain {
                margin-right: 10px;
                perspective: 1000px;
                .flipper {
                    transition: 0.6s;
                    transform-style:preserve-3d;
                    position: relative;
                    .itemPic, .back {
                        position: absolute;
                        top: 0;
                        left: 0;
                        backface-visibility: hidden;
                        background: #cc0000;
                        text-align: center;
                        color: white;
                        font-weight: 500;
                        line-height: 80px;
                        white-space: nowrap;
                    }
                    .itemPic {
                        z-index: 2;
                    }

                    .back {
                      transform: rotateY(180deg);
                    }
                }                   
            }
            .picContain:hover .flipper, .picContain.hover .flipper{
                transform: rotateY(180deg);
            }
            .picContain, .itemPic, .back{
                width: 80px;
                height: 80px;
            }
        }

    }
</style>