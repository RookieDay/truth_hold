<template>
   <view>
       <view v-if="show_records">
            <view class="prompt">还没有任何记录</view>
       </view>
       <view v-else>
           <view class="table th">
               <view class="date">时间</view>
               <view class="busi">分数</view>
               <view class="mark">最后得分</view>
               <view class="net">备注</view>
           </view>
           <record-list v-for="(record, index) in records" :key="index" :record="record">
           </record-list>
           <p class="text-footer" v-if="!more">我是有底线的</p>
           <p class="text-footer" v-else>加载中</p>
       </view>
   </view>
</template>

<script>
import { showModal, showSuccess, post, get } from '@/utils/util'
import RecordList from '@/components/record/RecordList'

export default {
    components: {
        RecordList
    },
    data() {
        return {
            userinfo: {},
            show_records: false,
            records: [],
            page: 0,
            more: true
        }
    },
    onShow() {
        const userinfo = wx.getStorageSync('userinfo')
        if (userinfo.openId)  {
            this.userinfo = userinfo
        }
        this.getRecords(true)
    },
    onShareAppMessage() {
        return {
            title: '真自律',
            path: '/pages/record/index'
        }
    },
    onReachBottom() {
        if (!this.more) {
            return
        }
        this.page += 1
        this.getRecords()
    },
    onPullDownRefresh() {
        this.getRecords(true)
        wx.stopPullDownRefresh()
    },
    methods: {
        async getRecords(init) {
            uni.showToast({
                title: "加载中...",
                icon: "loading"
            })
            if (init) {
                this.page = 0
                this.more = true
            }
            if (this.page === 0) {
                this.records = []
            }
            const data = {
                openid: this.userinfo.openId,
                page: this.page
            }
            try {
                const res = await get('/weapp/getrecords', data)
                console.log('getrecords success', res)
                // 数据的拼接
                this.records = [...this.records, ...res.records]
                if (res.records < 15 && this.page > 0) {
                    this.more = false
                }
                if (this.records.length === 0) {
                    this.show_records = true
                } else {
                    this.show_records = false
                }
                wx.hideToast()
            } catch (error) {
                wx.hideToast()
                console.log('records 获取失败', error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add{
    margin-top: 20px;
    margin-bottom: 10px;
    text-align:center;
  p{
      font-size: 15px;
  }
}
.th {
  width: 100%;
  height: 30px;
  line-height:30px;
  background: #EA5149;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
  display: flex;
}
.prompt{
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}
.date{
  width: 23%;
  padding-left: 60px;
}
.busi{
  width: 10%;
  margin-left: 5px;
}
.mark{
    width: 20%;
  margin-left: 10px;
}
.net{
  width: 20%;
  margin-left: 20px;
}
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
  padding-top: 5px;
}
</style>