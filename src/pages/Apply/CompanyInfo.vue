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
      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 公司/项目信息
        </view>
      </view>
      <view class="cu-list menu solids-top">
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/brand.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司品牌名称
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          <text>公司主营业务/产品名称，请确保据此能够搜索到您的网站/公众号/App</text>
        </view>
        <view class="cu-item text-gray">
          <text>如尚未发布，填写“无”</text>
        </view>
        <view class="cu-form-group cu-item">
          <input
            v-model="companyForm.companyBrand"
            placeholder="请按上述要求输入公司品牌名称"
            name="input"
            @blur="checkCompanyBrand"
          >
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/website.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司网址
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如尚未发布，请填写“无”
        </view>
        <view class="cu-form-group cu-item">
          <input
            v-model="companyForm.website"
            placeholder="请按上述要求输入公司网址"
            name="input"
            @blur="checkWebsite"
          >
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/app.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              App或公众号名称
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如尚未发布，请填写“无”
        </view>
        <view class="cu-form-group cu-item">
          <input
            v-model="companyForm.appName"
            placeholder="请按上述要求输入公司App或公众号"
            name="input"
            @blur="checkAppName"
          >
        </view>
        <view class="cu-form-group">
          <text class="cuIcon-calendar text-cyan" />
          <view class="title margin-left">
            公司成立时间
          </view>
          <picker
            mode="date"
            :value="companyForm.setup"
            start="1970-09-01"
            end="2019-01-14"
            @change="selectSetupDate"
          >
            <view class="picker">
              {{ companyForm.setup }}
            </view>
          </picker>
        </view>
        <view class="cu-form-group">
          <text class="cuIcon-locationfill text-orange" />
          <view class="title margin-left">
            公司总部所在城市
          </view>
          <picker
            mode="region"
            :value="companyForm.location"
            @change="selectCompanyLocation"
          >
            <view class="picker">
              {{ companyForm.location[0] }}，{{ companyForm.location[1] }}，{{ companyForm.location[2] }}
            </view>
          </picker>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/staff.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司员工数量(单位:人)
            </text>
          </view>
          <view class="cu-form-group">
            <uni-number-box
              :min="1"
              :max="1000"
              :value="companyForm.staffNum"
              @change="selectStaffNum"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/position.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left">
              您在企业中的职位(可多选)
            </text>
          </view>
        </view>
        <checkbox-group
          class="block"
          @change="selectPositions"
        >
          <view class="cu-form-group cu-list menu text-left">
            <view
              v-for="(positionItem, index) in positionList"
              :key="index"
              class="cu-item"
            >
              <label class="flex justify-between align-center flex-sub">
                <checkbox
                  :class="positionItem.checked?'checked':''"
                  :checked="positionItem.checked?true:false"
                  :value="positionItem.value"
                />
                <view class="flex-sub margin-left">
                  {{ positionItem.value }}
                </view>
                <input
                  v-if="positionItem.value==='其他'"
                  v-model="otherPosition"
                  placeholder="请输入您在企业中的职位"
                  name="input"
                >
              </label>
            </view>
          </view>
        </checkbox-group>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/companyInfo.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司/项目介绍(请填写最多200字)
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          为使面试组更好的了解您的公司/项目，烦请您认真填写
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="companyForm.companyInfo"
            class="sm-border"
            maxlength="200"
            placeholder="请按上述要求填写公司介绍"
            @blur="checkCompanyInfo"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/companyOperation.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司主要运营数据
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          如：对于在线类业务，如注册用户量、应用下载量、日活/周活/月活等；对于线下业务，如学员数/用户数、市场覆盖率等
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="companyForm.operationData"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述要求填写公司主要运营数据"
            @blur="checkOperationData"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/companyProfit.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              上一年度公司收入规模(单位:万元)
            </text>
          </view>
          <view class="cu-form-group">
            <uni-number-box
              :min="0"
              :max="9999"
              :value="companyForm.profitScale"
              @change="selectCompanyProfit"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/finance.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left">
              公司目前融资情况
            </text>
          </view>
        </view>
        <radio-group
          class="block"
          @change="selectFinance"
        >
          <view class="cu-form-group cu-list menu text-left">
            <view
              v-for="(financeItem, index) in financeList"
              :key="index"
              class="cu-item"
            >
              <label class="flex justify-between align-center flex-sub">
                <radio
                  class="blue radio"
                  :class="finance===financeItem?'checked':''"
                  :checked="finance===financeItem?true:false"
                  :value="financeItem"
                />
                <view class="flex-sub margin-left">{{ financeItem }}</view>
                <input
                  v-if="financeItem==='其他'"
                  v-model="otherFinance"
                  placeholder="请输入公司融资情况"
                  name="input"
                >
              </label>
            </view>
          </view>
        </radio-group>
        <view class="cu-item">
          请注明年份／融资规模／机构，例如：*A轮／2016年／3000W／好未来
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="companyForm.financeDetails"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述格式填写公司融资详情"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/value.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司目前估值(单位:万元)
            </text>
          </view>
          <view class="cu-form-group">
            <uni-number-box
              :min="0"
              :max="9999"
              :value="companyForm.companyValue"
              @change="selectCompanyValue"
            />
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/companyBusiness.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              公司介绍材料
            </text>
          </view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action">
            请上传公司商业计划书或介绍材料的相关图片
          </view>
          <view class="action">
            {{ companyForm.businessList.length }} / 4
          </view>
        </view>
        <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
            <view
              v-for="(business, index) in companyForm.businessList"
              :key="index"
              class="bg-img"
              :data-url="companyForm.businessList[index]"
              @tap="viewBusinuessImg"
            >
              <image
                :src="companyForm.businessList[index]"
                mode="aspectFill"
              />
              <view
                class="cu-tag bg-red"
                :data-index="index"
                @tap.stop="delBusinuessImg"
              >
                <text class="cuIcon-close" />
              </view>
            </view>
            <view
              v-if="companyForm.businessList.length<4"
              class="solids"
              @tap="selectBusinuessImg"
            >
              <text class="cuIcon-cameraadd" />
            </view>
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/supply.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              在此填写关于您的公司/项目的补充说明
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="companyForm.supply"
            class="sm-border"
            maxlength="-1"
            placeholder="请填写关于公司补充说明"
          />
        </view>
        <view class="cu-item flex">
          <view @tap="checkBefore">
            <text class="lg text-grey cuIcon-back" />
            <text class="basis-xl margin-left content">
              上一页
            </text>
          </view>
          <view @tap="checkNext">
            <text class="basis-xl margin-right content">
              下一页
            </text>
            <text class="lg text-grey cuIcon-right" />
          </view>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
import { uniNumberBox } from '@dcloudio/uni-ui'
export default {
  components: {
    uniNumberBox
  },
  data () {
    return {
      companyForm: {
        companyBrand: '',
        website: '',
        appName: '',
        setup: '2018-12-25',
        location: ['广东省', '广州市', '海珠区'],
        staffNum: 1,
        positions: [],
        companyInfo: '',
        operationData: '',
        profitScale: '',
        finance: '',
        financeDetails: '',
        companyValue: '',
        businessList: [],
        supply: ''
      },
      positionList: [
        {
          value: '创始人',
          checked: false
        }, {
          value: '联合创始人',
          checked: false
        }, {
          value: '董事长',
          checked: false
        }, {
          value: 'CEO',
          checked: false
        }, {
          value: '其他',
          checked: false
        }
      ],
      financeList: ['尚未获得投资', '已完成种子/天使融资', '已完成pre-A轮融资', '已完成A轮融资', '不方便透露', '其他'],
      otherPosition: '',
      otherFinance: ''
    }
  },
  methods: {
    selectSetupDate (e) {
      this.companyForm.setup = e.detail.value
    },
    selectCompanyLocation (e) {
      this.companyForm.location = e.detail.value
    },
    selectStaffNum (e) {
      this.companyForm.staffNum = parseInt(e)
    },
    selectPositions (e) {
      this.checkPosition(e.detail.value)
    },
    selectCompanyProfit (e) {
      this.companyForm.profitScale = parseFloat(e).toFixed(2)
    },
    selectFinance (e) {
      this.checkFinance(e.detail.value)
    },
    selectCompanyValue (e) {
      this.companyForm.companyValue = parseFloat(e).toFixed(2)
    },
    selectBusinuessImg () {
      uni.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          if (this.companyForm.businessList !== 0) {
            this.companyForm.businessList = this.companyForm.businessList.concat(res.tempFilePaths)
          } else {
            this.companyForm.businessList = res.tempFilePaths
          }
        }
      })
    },
    viewBusinuessImg (e) {
      uni.previewImage({
        urls: this.companyForm.businessList,
        current: e.currentTarget.dataset.url
      })
    },
    delBusinuessImg (e) {
      uni.showModal({
        title: '删除图片',
        content: '确定删除这张照片?',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.companyForm.businessList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    checkTextArea (text, info) {
    },
    checkCompanyBrand (e) {
      this.checkTextArea(e.detail.value, '公司品牌')
    },
    checkWebsite (e) {
      this.checkTextArea(e.detail.value, '公司网址')
    },
    checkAppName (e) {
      this.checkTextArea(e.detail.value, '公司App或公众号')
    },
    checkCompanyInfo (e) {
      this.checkTextArea(e.detail.value, '公司/项目介绍')
    },
    checkOperationData (e) {
      this.checkTextArea(e.detail.value, '公司主要运营数据')
    },
    checkPosition (values) {
    },
    checkFinance (finance) {
    },
    checkFinanceDetails (text, length, info) {
    },
    checkBefore () {
      console.log('应返回教育工作背景页，同时保存当前页面数据')
    },
    checkNext () {
      console.log('前往推荐人页')
      console.log(this.companyForm)
    }
  }
}
</script>

<style>
</style>
