<template>
    <view>
      <swiper class="card-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" 
      @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
        <swiper-item v-for="(item, index) in campList" :key="index" :class="cardCur==index?'cur':''">
          <view class="swiper-item">
            <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
          </view>
        </swiper-item>
      </swiper>
        
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item arrow" @tap="showCampInfo">
          <view class="content">
            <image src="../static/EdStarsLogo.png" class="png" mode="aspectFit"></image>
            <text class="text-grey">创新院xx期描述</text>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
    export default {
      name: 'CampItem',
      data () {
        return {
          campList: [{
            campId: 0,
            type: 'image',
            url: '../static/EdStarsApply.png'
          }, {
            campId: 1,
            type: 'image',
            url: '../static/EdStarsApply.png',
          }, {
            campId: 2,
            type: 'image',
            url: '../static/EdStarsApply.png'
          }, {
            campId: 3,
            type: 'image',
            url: '../static/EdStarsApply.png'
          }],
          cardCur: 0
        }
      },
      methods: {
        cardSwiper(e) {
        	this.cardCur = e.detail.current
        },
        showCampInfo(e) {
          console.log(e)
          uni.navigateTo({
            url: '../pages/Apply/CampInfo?campId=' + this.cardCur,
            fail: (res) => {
              console.log(res)
            },
            success: (res) => {
              console.log(res)
            }
          });
        }
      }
    }
</script>

<style>
</style>
