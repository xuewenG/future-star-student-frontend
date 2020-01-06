<template>
  <view>
    <cu-custom
      bg-color="bg-white"
      :is-back="true"
    >
      <block slot="backText">
        返回
      </block>
      <block slot="content">
        未来之星
      </block>
    </cu-custom>
    <view class="cu-list menu">
      <view class="cu-item padding-lg">
        <view
          class="cu-avatar radius lg"
          :style="'background-image:url('+schoolmateInfo.avatar+');'"
        />
        <view class="content margin-left">
          <view class="text-lg">
            {{ schoolmateInfo.name }}
          </view>
          <view class="text-gray">
            未来之星第{{ schoolmateInfo.camp }}期校友 &nbsp;|&nbsp; {{ schoolmateInfo.area }}
          </view>
          <view class="text-gray">
            {{ schoolmateInfo.profession }}
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-male text-cyan lg" />
          <text class="text-grey text-lg">
            性别&nbsp;&nbsp;&nbsp;&nbsp;{{ schoolmateInfo.sex }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-calendar text-cyan lg" />
          <text class="text-grey text-lg">
            出生日期&nbsp;&nbsp;{{ schoolmateInfo.birth }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-dianhua text-cyan lg" />
          <text class="text-grey text-lg">
            联系电话&nbsp;&nbsp;{{ schoolmateInfo.tel }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-mail text-cyan" />
          <text class="text-grey">
            常用邮箱&nbsp;&nbsp;{{ schoolmateInfo.mail }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-community text-cyan" />
          <text class="text-grey">
            毕业院校&nbsp;&nbsp;{{ schoolmateInfo.graudation }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-community text-cyan" />
          <text class="text-grey">
            所在公司&nbsp;&nbsp;{{ schoolmateInfo.company }}
          </text>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-calendar text-cyan" />
          <text class="text-grey">
            公司职务&nbsp;&nbsp;{{ schoolmateInfo.position }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SchoolmateInfo',
  data () {
    return {
      schoolmateInfo: {
        schoolmateId: '',
        name: '余昊然',
        avatar: '../../static/EdStarsLogo.png',
        camp: '2',
        area: '安徽·合肥',
        profession: '素质教育类',
        sex: '女',
        birth: '1978-02-21',
        tel: '15056042608',
        mail: '1361051747@qq.com',
        graudation: '2004-2008/北京大学/计算机科学/学士',
        company: '计蒜客',
        position: '讲师'
      }
    }
  },
  onLoad (option) {
    console.log(option.schoolmateId)
    this.schoolmateInfo.schoolmateId = option.schoolmateId
  }
}
</script>

<style>
</style>
