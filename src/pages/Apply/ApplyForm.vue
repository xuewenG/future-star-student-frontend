<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">未来之星</block>
    </cu-custom>
    <form>
      <view class="cu-bar bg-white margin-top-sm">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text> 基本信息
        </view>
      </view>
      <view class="cu-form-group margin-top">
        <text class='cuIcon-expressman text-cyan'></text>
        <view class="title margin-left">姓名</view>
        <input placeholder="请输入姓名" name="input" v-model="applyForm.name"/>
      </view>
      <radio-group class="block" @change="sexSelect">
        <view class="cu-form-group">
          <text class='cuIcon-male text-cyan'></text>
          <view class="title">性别</view>
            <radio class='blue radio margin-right-sm sm' 
              :class="sex=='male'?'checked':''" 
              :checked="sex=='male'?true:false" 
              value="男">
            </radio>
            <p class='margin-right'>男</p>
            <radio class='blue radio margin-right-sm sm' 
              :class="sex=='female'?'checked':''" 
              :checked="sex=='female'?true:false" 
              value="女">
            </radio>
            <p>女</p>
          </view>
      </radio-group>
      <view class="cu-form-group">
        <text class='cuIcon-calendar text-cyan'></text>
        <view class="title margin-left">出生日期</view>
        <picker mode="date" :value="applyForm.birthDate" start="1970-09-01" end="2000-09-01" @change="selectBirthDate">
          <view class="picker">
            {{ applyForm.birthDate }}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <text class='cuIcon-mobilefill text-cyan'></text>
        <view class="title margin-left">联系电话</view>
        <input placeholder="请输入联系电话" name="input" v-model="applyForm.tel"/>
        <view class="cu-capsule radius">
          <view class='cu-tag bg-blue '>
            +86
          </view>
          <view class="cu-tag line-blue">
            中国大陆
          </view>
        </view>
      </view>
      <view class="cu-form-group">
        <text class='cuIcon-mail text-cyan'></text>
        <view class="title margin-left">常用邮箱</view>
        <input placeholder="请输入常用邮箱" name="input" v-model="applyForm.mail"/>
      </view>
      <view class="cu-form-group">
        <text class='cuIcon-locationfill text-orange'></text>
        <view class="title margin-left">常驻城市</view>
        <picker mode="region" @change="selectCity" :value="applyForm.city">
          <view class="picker">
            {{ applyForm.city[0] }}，{{ applyForm.city[1] }}，{{ applyForm.city[2] }}
          </view>
        </picker>
      </view>
      
      <view class="cu-bar bg-white margin-top-sm">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text> 教育/工作背景
        </view>
      </view>
      
      <radio-group class="block" @change="selectEducation">
        <view class="cu-bar bg-white">
          <view class="action">
            <text class="cuIcon-profile text-cyan margin-left"></text>
            <text class="margin-left">最高学历</text>
          </view>
        </view>
        <view class="cu-form-group cu-list menu text-left">
          <view class="cu-item" v-for="(educationItem, index) in educationList" :key="index">
            <label class="flex justify-between align-center flex-sub">
              <radio class="blue radio"
              :class="education==educationItem?'checked':''" 
              :checked="education==educationItem?true:false"
              :value="educationItem">
              </radio>
              <view class="flex-sub margin-left">{{ educationItem }}</view>
              <input v-if="educationItem==='其他'" placeholder="请输入学历" name="input" v-model="otherEducation"/>
            </label>
          </view>
        </view>  
      </radio-group>
      
      <view class="cu-bar bg-white">
        <view class="action">
          <view class='cuIcon-cu-image'>
            <image src="../../static/college.png"></image>
          </view>
          <view class="title margin-left">最高学历毕业院校及起止时间</text>
          <view class="text-content">如：2004-2008/北京大学/计算机科学/学士</view>
        </view>
      </view>
      <view class="cu-form-group align-start">
        <textarea maxlength="-1" 
        placeholder="请按上述格式输入毕业院校及起止时间" 
        v-model="applyForm.graduation">
        </textarea>
      </view>
      
      <view class="btn-area margin-top padding">
        <button formType="submit" class="cu-btn bg-cyan shadow block" @tap="submitApplyForm">提交</button>
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
          position:  '',
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
          canals: [],  
        },
        educationList: ['博士研究生', '硕士研究生', '本科', '专科', '其他'],
        otherEducation: ''
      }
    },
    methods: {
      sexSelect(e) {
        if (e.detail.value === '男') {
          this.applyForm.sex = 'male'
        } else {
          this.applyForm.sex = 'female'
        }
      },
      selectBirthDate(e) {
        this.applyForm.birthDate = e.detail.value
      },
      selectCity(e) {
        this.applyForm.city = e.detail.value
      },
      selectEducation(e) {
        if (e.detail.value !== '其他') {
          this.applyForm.education = e.detail.value
        }
      },
      submitApplyForm() {
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
