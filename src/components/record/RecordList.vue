<template>
  <view class="book-card">
    <view class="table" width="98%">
        <view class="tr">
          <view class="date">
            {{create_time}}
          </view>
          <view class="busi">
            <label for="" v-if="record.add > 0">+{{record.add}}</label> 
            <label for="" v-if="record.add == 0">&nbsp;0</label> 
            <label for="" v-if="record.add < 0">-{{record.add}}</label> 
          </view>
          <view class="mark">
            <label for="" v-if="record.mark >= 0">&nbsp;{{record.mark}}</label>
            <label for="" v-else>{{record.mark}}</label>
          </view>
          <view class="net" @click="changeShow">
            <label for="" v-if="note">{{note}}</label>
            <label for="" v-else class="no-note">点击添加</label>
          </view>
          <label for="" v-if="showInput">
            <view class="image"  @click="cancel">
              <img src="~/static/images/quxiao.png" class="img" alt="" srcset="">
            </view>
          </label>
          <label for="" v-else>
            <view class="image"  @click="changeShow">
              <img :src="note ? src : ''" class="img" alt="" srcset="">
            </view>
          </label>
        </view>
    </view>
    <view class="hide" v-if="showInput">
      <button class="btn" @click="updateNote">
        <label for="" v-if="record.note">修改</label>
        <label for="" v-else>添加</label>
      </button>
      <input type="text" v-model="note" class="input" maxlength="10" placeholder="最多输入10个字符">
    </view>
  </view>
</template>

<script>
import { formatTime } from '@/utils/dateconvert'
import { showModal, showSuccess, post, get } from '@/utils/util'

export default {
  props: ['record'],
  data() {
    return {
      create_time: formatTime(new Date(this.record.create_time)),
      showInput: false,
      note: this.record.note,
      src: '/static/images/bianji.png'
    }
  },
  methods: {
    changeShow() {
      this.showInput = !this.showInput
    },
    async updateNote() {
				try {
					const data = {
            id: this.record.id,
            note: this.note
					} 
          const res = await post('/weapp/updateNote', data)
          this.showInput = false
          this.record.note = this.note
				} catch (error) {
					showModal('添加note失败', '请重试')
					console.log('后端返回添加note错误信息', error)
				}
    },
    cancel() {
      this.showInput = !this.showInput
      this.note = this.record.note
    }
  }
}
</script>

<style lang="scss" scoped>
.book-card{
  background: #FFFFFF;
  margin-bottom:6px;
  .table {
    border: 0px solid darkgray;
    font-size: 15px;
    height: 42px;
    line-height:42px;
    .tr {
      display: flex;
      width: 100%;
    }
    .date{
      width: 40%;
      margin-left: 10px;
    }
    .busi{
      width: 10%;
      font-weight:bold;
    }
    .mark{
      width: 15%;
      margin-left: 20px;
      font-weight:bold;
    }
    .net{
      width: 16%;
      text-align:center;
      width:60px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      font-size: 14px;
      margin-left: 5px;
      line-height:42px;
      .no-note{
        text-decoration:underline;
        color:#C0C0C0;
        font-size: 13px;
      }
    }
    .image{
      padding-top:1px;
      float: right;
      margin-left: 5px;
    }
  }
  .hide{
    background: #F0F0F0;
    font-size: 15px;
    padding: 10px 10px 3px 30px;
    .input{
      width:60%;
      height:30px;
      background:#FFFFFF;
      border:1px solid black;
      border-radius: 5px;
      text-align:center;
    }
    .btn{
      color:white;
      background:#EA5A49;
      padding-left: 15px;
      margin-right:20px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 30px;
      height: 30px;
      width: 18%;
      float:right;
    }
  }
  .img{
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>