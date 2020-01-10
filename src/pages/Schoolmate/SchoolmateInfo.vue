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
          class="cu-avatar lg margin"
          :style="'background-image:url('+schoolmateInfo.avatar_url+');'"
        />
        <view class="content margin-left">
          <view class="text-lg">
            {{ schoolmateInfo.name }}
          </view>
          <view class="text-gray">
            {{ schoolmateInfo.city }}
          </view>
          <view class="text-gray">
            {{ schoolmateInfo.profession }}
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-male text-cyan lg" />
              <text class="margin-xs radius">
                性别
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.gender === 0 ? '男' : '女' }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-calendar text-cyan lg" />
              <text class="margin-xs radius">
                出生日期
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.birthday }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-dianhua text-cyan lg" />
              <text class="margin-xs radius text-grey">
                联系电话
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.phone_number }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-mail text-cyan lg" />
              <text class="margin-xs radius text-grey">
                常用邮箱
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.email }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-community text-cyan lg" />
              <text class="margin-xs radius text-grey">
                毕业院校
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.school + '|' + schoolmateInfo.education }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-community text-cyan lg" />
              <text class="margin-xs radius text-grey">
                所在公司
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.company.name + '|' + schoolmateInfo.company.city }}
            </view>
          </view>
        </view>
      </view>

      <view class="cu-item">
        <view class="content">
          <view class="flex p-xs margin-bottom-sm mb-sm">
            <view class="flex-sub">
              <text class="cuIcon-calendar text-cyan lg" />
              <text class="margin-xs radius text-grey">
                公司职务
              </text>
            </view>
            <view class="flex-treble padding-sm margin-xs radius">
              {{ schoolmateInfo.company.position }}
            </view>
          </view>
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
      schoolmateInfo: {}
    }
  },
  onLoad (option) {
    const schoolmate = JSON.parse(decodeURIComponent(option.schoolmate))
    console.log(schoolmate)
    this.schoolmateInfo = schoolmate
  }
}
</script>

<style>
</style>
