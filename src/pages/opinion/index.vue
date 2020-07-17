<template>
  <view>
      <view class="container">
          <view class="row">
              <label for="" class="name">意见与反馈</label>
          </view>
          <view class="row text">
               <view>
                   <textarea
                   v-model="opinion"
                   maxlength="200"
                   placeholder="请输入... "
                   class="input"></textarea>
                   <label for="" class="word-count">{{wordCount}}/200</label>
               </view>
          </view>

          <view class="row">
              <viw>
                  <label class="name" for="">相关截图(选填)</label>
                  <label for="" class="img-count">{{img_count}}/2</label>
              </viw>
              <view>
                    <label 
              for=""
              v-for="(item, index) in imageSrc"
              :key="index">
                <img :src="item" class="img" alt="" srcset="">
              </label>
              <label @click="uploadPic" for="" v-if="img_count < 2">
                  <img class="add-img" src="~/static/images/addimage.png" alt="" srcset="">
              </label>
              </view>
          </view>
          <view class="row">
              <view class="name">
                  微信号(选填)
              </view>
              <input type="text" v-model="wechat" maxlength="20" placeholder="如果想要详细交流，请留下微信号~">
          </view>
      </view>
          <button @click="submit">提交</button>
  </view>
</template>

<script>
import { post, showModal } from '@/utils/util'

export default {
    data() {
        return {
            opinion: '',
            wordCount: 0,
            imageSrc: [],
            img_count: 0,
            wechat: ''
        }
    },
    watch: {
        opinion() {
            this.wordCount = this.opinion.length
        },
        imageSrc() {
            this.img_count = this.imageSrc.length
        }
    },
    methods: {
        uploadPic() {
            const that = this
            uni.chooseImage({
                count: 2,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: res => {
                    const tempFilePaths = res.tempFilePaths
                    that.imageSrc.push(tempFilePaths)
                    console.log(tempFilePaths)
                }
            })
        },
        async submit() {
          if (this.wordCount > 0) {
              const data = {
                opinion: this.opinion,
                src: this.imageSrc.join(','),
                wechat: this.wechat,
                openid: wx.getStorageSync('userinfo').openId
              }
              try {
                const res = await post('/weapp/createopinion', data)
                console.log(res)
                showModal('提交成功', '已将建议反馈')
              } catch (e) {
                showModal('提交失败', e)
                console.log('后台返回的失败', e)
              }
          } else {
            console.log('反馈信息空的')
            showModal('提交失败', '反馈信息不能为空')
          }
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
  background:#FFFFFF;
  font-size:15px;
  .text {
    height: 110px;
  }
  .row{
    border-bottom: 1px #E8E8E8 solid;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
  }
}  
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
</style>