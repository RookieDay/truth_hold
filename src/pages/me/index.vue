<template>
 <view>
      <view class="top">
        <view class="userinfo" >
          <!-- 取userinfo变量中的avatarUrl字段，也就是微信头像的链接 -->
          <img :src="userinfo.avatarUrl" alt="">
        </view>
        <view class="name">
          <!-- 取userinfo变量中的nickName字段，也就是微信昵称 -->
          <label>{{userinfo.nickName}}</label>
          <p class="notice">{{quote}}</p>
        </view>
      </view>

      <view class="container">
          <view class="row">
            <label class="left">
              <img class="img" src="/static/images/homework.png">
            </label>
            <label class="name">&nbsp;&nbsp;操作指引</label>
            <label class="right">
              >
            </label>
          </view>
          <view class="row">
            <label class="left">
              <img class="img" src="/static/images/classroom.png">
            </label>
            <label class="name">&nbsp;&nbsp;小程序开发实战课程</label>
            <label class="right">
              >
            </label>
          </view>
        </view>

        <view class="container">
          <view class="row">
            <label class="left">
              <img class="img" src="/static/images/delete.png">
            </label>
            <label class="name">&nbsp;&nbsp;清空记录</label>
            <label class="right">
              >
            </label>
          </view>
          <view class="row" @click="showOpinion">
            <label class="left">
              <img class="img" src="/static/images/approval.png">
            </label>
            <label class="name">&nbsp;&nbsp;意见反馈</label>
            <label class="right">
              >
            </label>
          </view>
      </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            userinfo: {},
            quote: ''
        }
    },
    mounted() {
        const userinfo = wx.getStorageSync('userinfo')

        if (userinfo.openId) {
            this.userinfo = userinfo
        }
    },
    methods: {
        rankArray() {
            let a  = Math.random() + ""
            let rank1 = a.charAt(5)
            let quote = ['不奋发，则心日颓靡；不检束，则心日恣肆','自制是一种秩序',
                        '一种对于快乐与欲望的控制',
                        '哪怕一点小小的克制，也会使人变得强而有力',
                        '做一个自律的人，像优秀的人学习，然后做好自己 ',
                        '真正的自由是在所有时候都能控制自己',
                        '每天爱自己多一点！！！',
                        '每天爱自己多一点！！！',
                        '如果连自己都不能控制，有什么资格去谈自己想要的',
                        '登峰造极的成就源于自律','自我控制是最强者的本能',
                        '立志言为本，修身行乃先']
            this.quote = quote[rank1]
        },
        showOpinion() {
            uni.navigateTo({
                url: '/pages/opinion/index'
            })
        }
    },
    onShow() {
        this.rankArray()
    }
}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 10px;
  background:#FFFFFF;
  font-size:15px;
  .row{
    padding: 0px 18px;
    border-bottom: 1px #E8E8E8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float:left;
      width: 20px;
      height: 20px;
      padding-top:16px;
      margin-right: 10px;
    }
    .name {
      float:left;
    }
  }
  .right {
    float: right;
    color: #C8C8C8;
    line-height:55px;
  }
  .left {
    width:80%;
  }
}  

.top{
  height: 80px;
  width: 100%;
  background:#EA5149;
  padding-top: 30px;
  display: block;
  .userinfo{
    padding-bottom: 5px;
    float: left;
    img{
      width: 120rpx;
      height:120rpx;
      margin: 10rpx;
      border-radius: 1px;
      border: 1px #D0D0D0 solid;
    }
  }
  .name{
    padding-top: 30px;
    padding-left: 5px;
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    .underline{
      border: 1px solid #ffffff;
      border-radius:5px;
      text-align:center;
    }
    .notice{
      color: #D8D8D8;
      font-size: 12px;
    }
    .a-line{
      background:#EA5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #FFFFFF;
      text-decoration:underline;
    }
  }
}
</style>