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
    <form>
      <view class="cu-bar bg-white margin-top-sm">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 基本信息
        </view>
      </view>
      <view class="cu-form-group margin-top">
        <text class="cuIcon-expressman text-cyan" />
        <view class="title margin-left">
          姓名
        </view>
        <input
          v-model="applyForm.name"
          placeholder="请输入姓名"
          name="input"
        >
      </view>
      <radio-group
        class="block"
        @change="sexSelect"
      >
        <view class="cu-form-group">
          <text class="cuIcon-male text-cyan" />
          <view class="title">
            性别
          </view>
          <radio
            class="blue radio margin-right-sm sm"
            :class="sex=='male'?'checked':''"
            :checked="sex=='male'?true:false"
            value="男"
          />
          <p class="margin-right">
            男
          </p>
          <radio
            class="blue radio margin-right-sm sm"
            :class="sex=='female'?'checked':''"
            :checked="sex=='female'?true:false"
            value="女"
          />
          <p>女</p>
        </view>
      </radio-group>
      <view class="cu-form-group">
        <text class="cuIcon-calendar text-cyan" />
        <view class="title margin-left">
          出生日期
        </view>
        <picker
          mode="date"
          :value="applyForm.birthDate"
          start="1970-09-01"
          end="2000-09-01"
          @change="selectBirthDate"
        >
          <view class="picker">
            {{ applyForm.birthDate }}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-mobilefill text-cyan" />
        <view class="title margin-left">
          联系电话
        </view>
        <input
          v-model="applyForm.tel"
          placeholder="请输入联系电话"
          name="input"
        >
        <view class="cu-capsule radius">
          <view class="cu-tag bg-blue ">
            +86
          </view>
          <view class="cu-tag line-blue">
            中国大陆
          </view>
        </view>
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-mail text-cyan" />
        <view class="title margin-left">
          常用邮箱
        </view>
        <input
          v-model="applyForm.mail"
          placeholder="请输入常用邮箱"
          name="input"
        >
      </view>
      <view class="cu-form-group">
        <text class="cuIcon-locationfill text-orange" />
        <view class="title margin-left">
          常驻城市
        </view>
        <picker
          mode="region"
          :value="applyForm.city"
          @change="selectCity"
        >
          <view class="picker">
            {{ applyForm.city[0] }}，{{ applyForm.city[1] }}，{{ applyForm.city[2] }}
          </view>
        </picker>
      </view>

      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 教育/工作背景
        </view>
      </view>

      <radio-group
        class="block"
        @change="selectEducation"
      >
        <view class="cu-bar bg-white cu-item">
          <view class="action">
            <text class="cuIcon-profile text-cyan margin-left" />
            <text class="margin-left">
              最高学历
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-list menu text-left">
          <view
            v-for="(educationItem, index) in educationList"
            :key="index"
            class="cu-item"
          >
            <label class="flex justify-between align-center flex-sub">
              <radio
                class="blue radio"
                :class="education==educationItem?'checked':''"
                :checked="education==educationItem?true:false"
                :value="educationItem"
              />
              <view class="flex-sub margin-left">{{ educationItem }}</view>
              <input
                v-if="educationItem==='其他'"
                v-model="otherEducation"
                placeholder="请输入学历"
                name="input"
              >
            </label>
          </view>
        </view>
      </radio-group>

      <view class="cu-list menu solids-top">
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/college.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              最高学历毕业院校及起止时间
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如：2004-2008/北京大学/计算机科学/学士
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="applyForm.graduation"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述格式输入毕业院校及起止时间"
          />
        </view>

        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/company.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              您创业前所在公司、职位及时间
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如：2010-2015/好未来/产品经理
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="applyForm.career"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述格式输入就业经历"
          />
        </view>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  name: 'ApplyForm',
  data () {
    return {
      applyForm: {
        name: '',
        sex: 'male',
        birthDate: '2018-12-25',
        tel: '',
        sx: '',
        mail: '',
        city: ['广东省', '广州市', '海珠区'],
        education: '',
        graduation: '',
        career: '',
        companyBrand: '',
        website: '',
        appName: '',
        setup: '',
        location: '',
        staffNum: '',
        position: '',
        companyInfo: '',
        operationData: '',
        profitScale: '',
        finance: '',
        value: '',
        business: '',
        supply: '',
        referees: [],
        check: '',
        applyReason: '',
        contributions: '',
        canals: []
      },
      educationList: ['博士研究生', '硕士研究生', '本科', '专科', '其他'],
      otherEducation: ''
    }
  },
  methods: {
    sexSelect (e) {
      if (e.detail.value === '男') {
        this.applyForm.sex = 'male'
      } else {
        this.applyForm.sex = 'female'
      }
    },
    selectBirthDate (e) {
      this.applyForm.birthDate = e.detail.value
    },
    selectCity (e) {
      this.applyForm.city = e.detail.value
    },
    selectEducation (e) {
      if (e.detail.value !== '其他') {
        this.applyForm.education = e.detail.value
      }
    },
    submitApplyForm () {
      if (this.otherEducation !== '') {
        this.applyForm.education = this.otherEducation
      }
      console.log(this.applyForm)
    }
  }
}
</script>

<style>
  .flex {
    flex-direction: row;
  }
</style>
