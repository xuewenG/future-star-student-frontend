<template>
  <view>
    <view>
      <view>
        <view class="header">
          <image src="https://i.loli.net/2020/01/09/iEZpONujHL4Sc13.png" />
        </view>
        <view class="content">
          <view>申请获取以下权限</view>
          <text>获得你的公开信息(昵称，头像、地区等)</text>
        </view>
        <button
          class="bottom"
          type="primary"
          open-type="getUserInfo"
          withCredentials="true"
          lang="zh_CN"
          @getuserinfo="wxGetUserInfo"
        >
          授权登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import loginRequest from '@/request/Login/LoginRequest'

export default {
  data () {
    return {
      SessionKey: '',
      OpenId: '',
      nickName: null,
      avatarUrl: null,
      allow: uni.getStorageSync('allow')// 默认为true
    }
  },
  methods: {
    // 第一授权获取用户信息 => 按钮触发
    wxGetUserInfo () {
      console.log('click')
      uni.getUserInfo({
        provider: 'weixin',
        success: (infoRes) => {
          console.log('allow')
          const nickName = infoRes.userInfo.nickName // 昵称
          const avatarUrl = infoRes.userInfo.avatarUrl // 头像
          console.log(nickName)
          console.log(avatarUrl)
          try {
            uni.setStorageSync('allow', true)// 记录是否第一次授权  false:表示不是第一次授权
            this.allow = true
            this.login()
          } catch (e) {
            console.log(e)
            console.log('授权失败')
          }
        },
        fail: function (res) {
          console.log('refuse')
          console.log(res)
          console.log('获取用户信息失败')
          uni.showToast({
            title: '您拒绝了授权',
            icon: 'none'
          })
        }
      })
    },
    // 登录
    login () {
      if (!this.allow) {
        return
      }
      uni.showLoading({
        title: '登录中...'
      })
      // 1.wx获取登录用户code
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log(JSON.stringify(loginRes))
          const code = loginRes.code
          // 非第一次授权获取用户信息
          uni.getUserInfo({
            provider: 'weixin',
            success: (infoRes) => {
              console.log('-------获取微信用户所有-----')
              console.log(JSON.stringify(infoRes.userInfo))
              // 获取用户信息后向调用信息更新方法
              const avatarUrl = infoRes.userInfo.avatarUrl // 头像
              let gender = infoRes.userInfo.gender - 1// 性别
              if (gender !== 0 || gender !== 1) {
                gender = 0
              }
              console.log(code)
              loginRequest.login({
                code,
                avatar_url: avatarUrl,
                gender
              })
            },
            fail: () => {
              uni.hideLoading()
            }
          })
        }
      })
    }
  },
  onLoad () {
    this.login()
  }
}
</script>

<style>
.header {
  width: 650rpx;
  height: 300rpx;
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  line-height: 450rpx;
  text-align: center;
}

.header image {
  width: 200rpx;
  height: 200rpx;
}

.content {
  margin-bottom: 90rpx;
  margin-left: 50rpx;
}

.content text {
  display: block;
  margin-top: 40rpx;
  color: #9d9d9d;
}

.bottom {
  margin: 70rpx 50rpx;
  border-radius: 80rpx;
  font-size: 35rpx;
}
</style>
