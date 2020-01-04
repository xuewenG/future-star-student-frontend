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
      :style="[{height:'calc(100vh - '+ customBar + 'px - 50px)'}]"
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
  // props: {
  //   schoolmateList: {
  //     type: Array,
  //     required: true
  //   }
  // },
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
        }
      ],
      statusBar: this.StatusBar,
      customBar: this.CustomBar,
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
    uni.createSelectorQuery().in(this).select('.indexBar-box').boundingClientRect(function (res) {
      console.log(res)
      that.boxTop = res.top
    }).exec()
    uni.createSelectorQuery().in(this).select('.indexes').boundingClientRect(function (res) {
      console.log(res)
      that.barTop = res.top
    }).exec()
  },
  methods: {
    getSchoolmateInfo (id) {
      // uni.navigateTo({
      //   url: '../pages/Schoolmate/SchoolmateInfo?schoolmateId=' + id,
      //   success: (res) => {
      //     console.log(res)
      //   },
      //   fail: (res) => {
      //     console.log(res)
      //   }
      // })
    },
    getCur (e) {
      this.hidden = false
      this.groupCur = this.schoolmateList[e.target.id].letter
    },
    setCur (e) {
      this.hidden = true
      this.groupCur = this.groupCurId
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
  right: 0px;
  bottom: 0px;
  padding: 20upx 20upx 20upx 60upx;
  display: flex;
  align-items: center;
}

.indexBar .indexBar-box {
  width: 40upx;
  height: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
  border-radius: 10upx;
}

.indexBar-item {
  flex: 1;
  width: 40upx;
  height: 40upx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24upx;
  color: #888;
}

movable-view.indexBar-item {
  width: 40upx;
  height: 40upx;
  z-index: 9;
  position: relative;
}

movable-view.indexBar-item::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 10upx;
  height: 20upx;
  width: 4upx;
  background-color: #f37b1d;
}

.indexToast {
  position: fixed;
  top: 0;
  right: 80upx;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100upx;
  height: 100upx;
  border-radius: 10upx;
  margin: auto;
  color: #fff;
  line-height: 100upx;
  text-align: center;
  font-size: 48upx;
}
</style>
