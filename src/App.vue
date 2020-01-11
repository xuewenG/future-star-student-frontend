<script>
import Vue from 'vue'
export default {
  onLaunch: function () {
    uni.getSystemInfo({
      success: function (e) {
        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight
        const custom = wx.getMenuButtonBoundingClientRect()
        Vue.prototype.Custom = custom
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight
        // #endif
      }
    })
    Vue.prototype.ColorList = [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    }
    ]
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
  @import "colorui/main.css";
  @import "colorui/icon.css";
  
  page {
    font-family:"PingFangSC-Thin";
    font-size:32rpx;          /*微信小程序中，使用rpx做单位*/
  }
  
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 40upx;
  }

  .nav-li {
    position: relative;
    z-index: 1;
    width: 45%;
    padding: 30upx;
    margin: 0 2.5% 40upx;
    border-radius: 12upx;
    background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
    background-position: center;
    background-size: cover;
  }

  .nav-li::after {
    position: absolute;
    z-index: -1;
    bottom: -10%;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10upx;
    background-color: inherit;
    opacity: .2;
    transform: scale(.9, .9);
    content: "";
  }

  .nav-li.cur {
    color: #fff;
    background: rgb(94, 185, 94);
    box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, .4);
  }

  .nav-title {
    font-weight: 300;
    font-size: 32upx;
  }

  .nav-title::first-letter {
    margin-right: 4upx;
    font-size: 40upx;
  }

  .nav-name {
    position: relative;
    margin-top: 20upx;
    font-size: 28upx;
    text-transform: Capitalize;
  }

  .nav-name::before {
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 40upx;
    height: 6upx;
    background: #fff;
    opacity: .5;
    content: "";
  }

  .nav-name::after {
    position: absolute;
    bottom: 0;
    right: 40upx;
    display: block;
    width: 100upx;
    height: 1px;
    background: #fff;
    opacity: .3;
    content: "";
  }

  .nav-name::first-letter {
    margin-right: 1px;
    font-weight: bold;
    font-size: 36upx;
  }

  .nav-li text {
    position: absolute;
    top: 30upx;
    right: 30upx;
    width: 60upx;
    height: 60upx;
    font-size: 52upx;
    line-height: 60upx;
    text-align: center;
  }

  .text-light {
    font-weight: 300;
  }

  @keyframes show {
    0% {
      transform: translateY(-50px);
    }

    60% {
      transform: translateY(40upx);
    }

    100% {
      transform: translateY(0);
    }
  }

  @-webkit-keyframes show {
    0% {
      transform: translateY(-50px);
    }

    60% {
      transform: translateY(40upx);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
