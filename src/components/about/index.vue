<template>
    <div>
        <div class="aboutus">
            <div id="aboutusInfo">
                <div class="weizhi1">
                    <!-- <h2>关于我们</h2>
                    <p>面向互联网求职招聘，提供更多的实习和工作机会</p>
                    <p>即刻起，点赞你的生活，从这一份工作开始。</p> -->
                </div>
            </div>
        </div>
        <div class="title">
            <h3>联系我们</h3>
            <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3>
        </div>
        <div class="footer">
            <div class="weizhi2">
                <a href="https://www.lagou.com/"><img src="../../assets/logo1.png"><span>https://www.lagou.com/</span></a>
                <a href="http://www.chinahr.com/"><img src="../../assets/logo2.png"><span>http://www.chinahr.com/</span></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'about',
    }
</script>

<style lang="scss" scoped>
    .title{
        width: 100%;
        // height: 49px;
        margin: 30px  auto;
        text-align: center;
        padding-left: 10px;
        color: #888;
        background-color: #EDEDED;
        h3{
            margin: 0;
            padding: 0;
        }
    }
    .footer {
  width: 100%;
  height: 100px;
  background: black;
  padding-top:20px
}

.footer a {
  color: white;
  text-decoration: none;
}

.aboutus  {
  width: 100%;
  height: 500px;
  background: url("https://upload-images.jianshu.io/upload_images/9381131-fd2872c9d933b2de.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240") no-repeat;
  background-size: 100% 100%;
  filter: grayscale(70%);
  opacity: 0.7;
  color: white;
  font-weight: 600;
  padding-top: 60px;
}

.aboutus p{
  margin-top: 30px;
  font-size: 18px;
}

#aboutusInfo {
  margin-top: 80px;
  animation-delay: 1s
}
.footer img{
  width:25px;
  height: 25px;
  margin-right: 10px
}

.footer span {
  margin-right: 20px;
}


</style>