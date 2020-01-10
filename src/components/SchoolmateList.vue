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
              class="cu-item arrow padding-lg"
              @tap="getSchoolmateInfo(schoolmateItem.id)"
            >
              <view
                class="cu-avatar lg"
                :style="'background-image:url('+schoolmateItem.avatar_url+');'"
              />
              <view class="content">
                <view class="text-lg">
                  {{ schoolmateItem.name }} {{ schoolmateItem.wx }}
                </view>
                <view class="text-gray text-sm">
                  {{ schoolmateItem.company.name + schoolmateItem.company.position }}
                </view>
                <view class="text-gray text-sm">
                  {{ schoolmateItem.city }} &nbsp;|&nbsp;{{ schoolmateItem.profession }}
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
import SchoolmateRequest from '@/request/Schoolmate/SchoolmateRequest.js'
export default {
  name: 'SchoolmateList',
  data () {
    return {
      schoolmateList: [],
      statusBar: this.StatusBar,
      customBar: this.CustomBar,
      selectBar: '',
      listBar: '',
      hidden: true,
      groupCurId: '',
      groupCur: '',
      option: {
        camp: '',
        name: '',
        city: '',
        profession: ''
      }
    }
  },
  mounted () {
    let url = '?'
    if (this.option.camp !== '') {
      url += 'semester_id=' + this.option.camp + '&'
    }
    if (this.option.name !== '') {
      url += 'name=' + this.option.name + '&'
    }
    if (this.option.city !== '') {
      url += 'city=' + this.option.city + '&'
    }
    if (this.option.profession !== '') {
      url += 'profession=' + this.option.profession
    }
    SchoolmateRequest.getSchoolmateList(url).then(schoolmateList => {
      console.log(schoolmateList)
      this.schoolmateList = schoolmateList
      this.groupCur = this.schoolmateList[0]
    })
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
