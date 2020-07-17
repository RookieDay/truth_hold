<template>
  <view>
	<view class="modal_mask"></view>
	<view class="modal_dialog">
		<view class="modal_content">
			<img class="img" src="~/static/images/littleTip-huang.jpg" alt="" srcset="">
			<view class="content-text">
				<p class="key-bold">狗蛋儿的小屋</p>
				<p class="key-bold">生活的一切一切</p>
				<p class="little-tip">加油</p>
				<p class="little-content">吃啊</p>
				<p class="little-content">谁啊</p>
			</view>
		</view>
		<view class="modal_footer">
			<button open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">授权登陆</button>
		</view>
	</view>

  </view>
</template>

<script>
import config from '@/utils/config'
import qcloud from 'wafer2-client-sdk'
import { showSuccess } from '@/utils/util'

export default {
    methods: {
        login() {
            // 设置登录地址
            qcloud.setLoginUrl(config.loginUrl);
            qcloud.login({
                success: userInfo => {
                    console.log('登录成功', userInfo)
					this.loginSuccess(userInfo)
					this.$emit('changeShow', { login: false, userInfo })
					wx.showTabBar()
					showSuccess('登陆成功')
                },
                fail: err => {
                    console.log('登录失败', err);
                }
            });
        },
        loginSuccess(userInfo) {
			wx.setStorageSync('userinfo', userInfo)
        }
    }
}
</script>

<style lang="scss" scoped>

.modal_mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #000;
	opacity: .5;
	z-index: 9000;
	color: #fff;
	overflow: hidden;
}

.modal_dialog {
	box-sizing: border-box;
	width: 560rpx;
	overflow: hidden;
	position: fixed;
	top: 30%;
	left: 0;
	z-index: 9999;
	background-color: #fff;
	margin: -150rpx 95rpx;
	border-radius: 16rpx;
  .modal_content {
	  box-sizing: border-box;
	  display: flex;
	  padding: 0rpx 53rpx 50rpx 53rpx;
	  font-size: 32rpx;
	  align-items: center;
	  justify-content: center;
	  flex-direction: column;
    .img {
 width: 280px;
  height:90px;
    }

    .content-text {
		 height:130px;
		padding:10px 0px 50px 0px;
		font-size:14px;
      .key-bold {
		padding-top:5px;
		font-size: 14px;
		font-weight:bold;
      }

     .little-tip {
		padding-top:15px;
		padding-bottom:3px;
		font-size: 14px;
		font-weight:bold;
		color: #feb600;
      }
	  .little-content {
		  padding-top:5px;
		font-size: 13px;
		color:#606060;
	  }
    }
  }

  .modal_footer {
	    box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight:bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background:#feb600;
  .btn {
  width: 100%;
  background:#feb600;
  color:#FFFFFF;
  font-weight:bold;
    }
  }
}
</style>