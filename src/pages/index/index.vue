<template>
<view>
	<view v-if="showLogin">
		<login-win @changeShow="getModel"></login-win>
	</view>
	<view class="show">
		<view class="button">
			<view class="btn1 right" @click="recall()">撤销</view>
			<view class="btn0" @click="reset()">清零</view>
		</view>
		<view class="mark-text">当前分数</view>
		<view class="mark">{{mark}}</view>
	</view>
	<view class="row">
		<view class="button right" @click="addMark(1)">+1</view>
		<view class="button left" @click="addMark(-1)">-1</view>
	</view>
	
	<view class="row">
		<view class="button right" @click="addMark(+5)">+5</view>
		<view class="button left" @click="addMark(-5)">-5</view>
	</view>
</view>
</template>

<script>
import loginWin from '@/components/login/loginWin'
import { showModal, showSuccess, post, get } from '@/utils/util'


	export default {
		components: {
			loginWin
		},
		data() {
			return {
				mark: 0,
				userinfo: {},
				showLogin: false,
				mark: 0
			}
		},
		onLoad() {
		},
		methods: {
			async addMark(add) {
				try {
					const data = {
						openid: wx.getStorageSync('userinfo').openId,
						add: add
					} 
					const res = await post('/weapp/createrecord', data)
					this.mark = this.mark + add
				} catch (error) {
					showModal('请求失败', '请重试')
					console.log('后端返回错误信息', error)
				}
			},
			async getCurrentMark() {
				try {
					const res = await get('/weapp/getmark', { openid: this.userinfo.openId})
					this.mark = res.mark
				} catch (error) {
					showModal('请求失败', '请重试')
					console.log('后端返回错误信息', error)
				}
			},
			getModel(val) {
				console.log('gettttttttttttttmodel')
				console.log(val)
				this.showLogin = val.login
				this.userinfo = val.userInfo
				this.getCurrentMark()
			},
			async resetMark() {
				if (this.mark !== 0) {
					try {
						const res = await post('/weapp/resetmark',  { openid: this.userinfo.openId})
						console.log('reset success', res)
						this.mark = 0
					} catch (error) {
						showModal('失败')
						console.log('reset 失败',error)
					}
				}
			},
			reset() {
				let that = this
				uni.showModal({
					content: '确定清零吗？',
					success: res => {
						if (res.confirm) {
							that.resetMark()
						}
					}
				})
			},
			async recall() {
				if (this.mark !== 0) {
					try {
						const res = await post('/weapp/recall',  { openid: this.userinfo.openId})
						console.log('recall success', res)
						this.mark = res.mark
						showSuccess({ title: '撤销成功' })
					} catch (error) {
						showModal('撤销失败')
						console.log('recall 失败',error)
					}
				}
			}
		},
		mounted() {
			const userinfo = wx.getStorageSync('userinfo')
			if (userinfo.openId)  {
				this.userinfo = userinfo
			} else {
				wx.hideTabBar()
				this.showLogin = true
			}
		},
		onShow() {
			this.getCurrentMark()
		},
		onPullDownRefresh() {
			console.log('refresh')
			this.getCurrentMark()
			uni.stopPullDownRefresh()
		},
		onShareAppMessage() {
			return {
				title: '真自律',
				path: '/pages/index/index'
			}
		}
	}
</script>

<style scoped lang="scss">
.show {
	text-align: center;
	height: 266px;
	background-color: #ea5149;
	color: #fff;
	margin-bottom: 5px;
	font-weight: bold;
  .mark-text {
	  font-size: 20px;
	  padding: 28px;
  }

  .mark {
	  font-size: 88px;
  }
  .button {
	  margin: 0 10px;
	  height: 30px;
	  line-height: 30px;
	  text-align: center;
	  font-size: 15px;
	  font-weight: bodl;
	  background: #ea5149;
	  .btn0 {
		  width: 60px;
		  border-radius: 15px;
		  border: 1px dashed #eee;
	  }
	  .btn1 {
		  width: 60px;
		  border-radius: 15px;
		  border: 1px dashed #eee;
	  }
  }	
}

.row {
	margin: 40px 56px;
  .button {
	  width: 70px;
	  height: 70px;
	  line-height: 70px;
	  border-radius: 20%;
	  border: none;
	  text-align: center;
	  font-size: 25px;
	  color: #fff;
	  font-weight: bold;
  }
}
 .right {
	 background-color: #ea5149;
	 float: right;
 }
  .left{
	 background-color: #feb600;;
	margin-right: 80px;  
}



</style>
