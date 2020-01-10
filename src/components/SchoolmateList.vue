<template>
  <view>
    <view
      class="cu-bar bg-white search fixed"
      :style="[{top:customBar + 'px'}]"
    >
      <view class="search-form round">
        <text class="cuIcon-search" />
        <input
          type="text"
          placeholder="输入搜索的关键词"
          confirm-type="search"
        >
      </view>
      <view class="action">
        <button class="cu-btn bg-gradual-green shadow-blur round">
          搜索
        </button>
      </view>
    </view>

    <scroll-view
      scroll-y
      class="indexes"
      :scroll-into-view="'indexes-'+ groupCurId"
      :style="[{height:'calc(100vh - '+ customBar + 'px - ' + selectBar + 'px - 50px)'}, {top:selectBar + 'px'}]"
      :scroll-with-animation="true"
      :enable-back-to-top="true"
    >
      <block
        v-for="(schoollmateGroup, index) in schoolmateList"
        :key="index"
      >
        <view
          :id="'indexes-' + schoollmateGroup.letter"
          :class="'indexItem-' + schoollmateGroup.letter"
          :data-index="schoollmateGroup.letter"
        >
          <view class="padding">
            {{ schoollmateGroup.letter }}
          </view>
          <view class="cu-list menu-avatar no-padding">
            <view
              v-for="(schoolmateItem, schoolmateIndex) in schoollmateGroup.group"
              :key="schoolmateIndex"
              class="cu-item arrow"
              @tap="getSchoolmateInfo(schoolmateItem.id)"
            >
              <view
                class="cu-avatar round lg"
                :style="'background-image:url('+schoolmateItem.avatar+');'"
              />
              <view class="content">
                <view class="text-lg">
                  {{ schoolmateItem.name }}
                </view>
                <view class="text-gray">
                  未来之星第{{ schoolmateItem.camp }}期校友 &nbsp;|&nbsp; {{ schoolmateItem.area }}
                </view>
                <view class="text-gray">
                  {{ schoolmateItem.profession }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </block>
    </scroll-view>

    <view
      class="indexBar"
      :style="[{height:'calc(100vh - ' + customBar + 'px - 50px)'}]"
    >
      <view
        class="indexBar-box"
        @touchstart="toStart"
        @touchend="toEnd"
        @touchmove.stop="toMove"
      >
        <view
          v-for="(item, index) in schoolmateList"
          :id="index"
          :key="index"
          class="indexBar-item"
          @touchstart="getCur"
          @touchend="setCur"
        >
          {{ item.letter }}
        </view>
      </view>
    </view>
    <view
      v-show="!hidden"
      class="indexToast"
    >
      {{ groupCur }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'SchoolmateList',
  data () {
    return {
      schoolmateList: [
        {
          letter: 'A',
          group: [
            {
              id: 1,
              name: '阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '2',
              area: '英国',
              profession: '歌手'
            }, {
              id: 2,
              name: '阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '2',
              area: '英国',
              profession: '歌手'
            }, {
              id: 3,
              name: '阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '2',
              area: '英国',
              profession: '歌手'
            }
          ]
        }, {
          letter: 'B',
          group: [
            {
              id: 4,
              name: 'B阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }, {
              id: 5,
              name: 'B阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }, {
              id: 6,
              name: 'B阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }
          ]
        }, {
          letter: 'C',
          group: [
            {
              id: 7,
              name: 'C阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }, {
              id: 8,
              name: 'C阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }, {
              id: 9,
              name: 'C阿黛尔',
              avatar: '../../static/EdStarsLogo.png',
              camp: '3',
              area: '英国',
              profession: '歌手'
            }
          ]
        }
      ],
      statusBar: this.StatusBar,
      customBar: this.CustomBar,
      selectBar: '',
      listBar: '',
      hidden: true,
      groupCurId: '',
      groupCur: ''
    }
  },
  onLoad () {
    this.groupCur = this.schoolmateList[0]
  },
  onReady () {
    const that = this
    uni.createSelectorQuery().in(this).select('.cu-bar').boundingClientRect(function (res) {
      that.selectBar = res.height
    }).exec()
    uni.createSelectorQuery().in(this).select('.indexBar-box').boundingClientRect(function (res) {
      that.boxTop = res.top
    }).exec()
    uni.createSelectorQuery().in(this).select('.indexes').boundingClientRect(function (res) {
      that.barTop = res.top
    }).exec()
  },
  methods: {
    getSchoolmateInfo (id) {
      /* global uni:false */
      uni.navigateTo({
        url: '/pages/Schoolmate/SchoolmateInfo?schoolmateId=' + id,
        success: (res) => {
          console.log(res)
        },
        fail: (res) => {
          console.log(res)
        }
      })
    },
    getCur (e) {
      this.hidden = false
      this.groupCur = this.schoolmateList[e.target.id].letter
    },
    setCur (e) {
      const that = this
      this.hidden = true
      this.groupCur = that.groupCur
    },
    toStart () {
      this.hidden = false
    },
    toEnd () {
      this.hidden = true
      this.groupCurId = this.groupCur
    },
    toMove (e) {
      const y = e.touches[0].clientY
      const offsettop = this.boxTop
      const that = this
      if (y > offsettop) {
        const num = parseInt((y - offsettop) / 20)
        this.groupCur = that.schoolmateList[num].letter
      }
    },
    indexSelect (e) {
      const that = this
      const barHeight = this.barHeight
      const list = this.schoolmateList
      const scrollY = Math.ceil(list.length * e.detail.y / barHeight)
      for (let i = 0; i < list.length; i++) {
        if (scrollY < i + 1) {
          that.groupCur = list[i].letter
          that.movableY = i * 20
          return false
        }
      }
    }
  }
}
</script>

<style>
.indexes {
  position: relative;
}

.indexBar {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 20upx 20upx 20upx 60upx;
}

.indexBar .indexBar-box {
  display: flex;
  flex-direction: column;
  width: 40upx;
  height: auto;
  border-radius: 10upx;
  background: #fff;
  box-shadow: 0 0 20upx rgba(0, 0, 0, .1);
}

.indexBar-item {
  position: relative;
  z-index: 9;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 40upx;
  height: 40upx;
  font-size: 24upx;
  color: #888;
}

.indexBar-item::before {
  position: absolute;
  top: 10upx;
  left: 0;
  display: block;
  width: 4upx;
  height: 20upx;
  background-color: #f37b1d;
  content: "";
}

.indexToast {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 80upx;
  width: 100upx;
  height: 100upx;
  margin: auto;
  border-radius: 10upx;
  font-size: 48upx;
  line-height: 100upx;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, .5);
}
</style>
