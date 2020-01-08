<template>
  <view>
    <view v-if="isCanUse">
      <view>
        <view class="header">
          <image src="../../static/EdStarsLogo.png" />
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
export default {
  data () {
    return {
      SessionKey: '',
      OpenId: '',
      nickName: null,
      avatarUrl: null,
      isCanUse: uni.getStorageSync('isCanUse') || true// 默认为true
    }
  },
  methods: {
    // 第一授权获取用户信息===》按钮触发
    wxGetUserInfo () {
      uni.getUserInfo({
        provider: 'weixin',
        success: (infoRes) => {
          const nickName = infoRes.userInfo.nickName // 昵称
          const avatarUrl = infoRes.userInfo.avatarUrl // 头像
          console.log(nickName)
          console.log(avatarUrl)
          this.login()
          try {
            uni.setStorageSync('isCanUse', false)// 记录是否第一次授权  false:表示不是第一次授权
            // _this.updateUserInfo()
          } catch (e) {
            console.log(e)
            console.log('授权失败')
          }
        },
        fail: function (res) {
          console.log(res)
          console.log('获取用户信息失败')
        }
      })
    },
    // 登录
    login () {
      uni.showLoading({
        title: '登录中...'
      })
      // 1.wx获取登录用户code
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log(JSON.stringify(loginRes))
          const code = loginRes.code
          if (!this.isCanUse) {
            // 非第一次授权获取用户信息
            uni.getUserInfo({
              provider: 'weixin',
              success: function (infoRes) {
                console.log('-------获取微信用户所有-----')
                console.log(JSON.stringify(infoRes.userInfo))
                // 获取用户信息后向调用信息更新方法
                const nickName = infoRes.userInfo.nickName // 昵称
                const avatarUrl = infoRes.userInfo.avatarUrl // 头像
              }
            })
          }
          // 2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
          uni.request({
            url: '服务器地址',
            data: {
              code: code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              // openId、或SessionKdy存储//隐藏loading
              uni.hideLoading()
            }
          })
        }
      })
    }
  },
  onLoad () { // 默认加载
    // this.login()
  }
}
</script>

<style>
.header {
  margin: 90rpx 0 90rpx 50rpx;
  border-bottom: 1px solid #ccc;
  text-align: center;
  width: 650rpx;
  height: 300rpx;
  line-height: 450rpx;
}
.header image {
  width: 200rpx;
  height: 200rpx;
}
.content {
  margin-left: 50rpx;
  margin-bottom: 90rpx;
}
.content text {
  display: block;
  color: #9d9d9d;
  margin-top: 40rpx;
}
.bottom {
  border-radius: 80rpx;
  margin: 70rpx 50rpx;
  font-size: 35rpx;
}
</style>
