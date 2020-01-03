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
                :class="education===educationItem?'checked':''"
                :checked="education===educationItem?true:false"
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
            v-model="applyForm.companyBrand"
            placeholder="请按上述要求输入公司品牌名称"
            name="input"
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
            v-model="applyForm.website"
            placeholder="请按上述要求输入公司网址"
            name="input"
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
            v-model="applyForm.appName"
            placeholder="请按上述要求输入公司App或公众号"
            name="input"
          >
        </view>
        <view class="cu-form-group">
          <text class="cuIcon-calendar text-cyan" />
          <view class="title margin-left">
            公司成立时间
          </view>
          <picker
            mode="date"
            :value="applyForm.setup"
            start="1970-09-01"
            end="2019-01-14"
            @change="selectSetupDate"
          >
            <view class="picker">
              {{ applyForm.setup }}
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
            :value="applyForm.location"
            @change="selectCompanyLocation"
          >
            <view class="picker">
              {{ applyForm.location[0] }}，{{ applyForm.location[1] }}，{{ applyForm.location[2] }}
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
              :value="applyForm.staffNum"
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
            v-model="applyForm.companyInfo"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述要求填写公司介绍"
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
            v-model="applyForm.operationData"
            class="sm-border"
            maxlength="-1"
            placeholder="请按上述要求填写公司主要运营数据"
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
              :value="applyForm.profitScale"
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
            v-model="applyForm.financeDetails"
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
              :value="applyForm.companyValue"
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
            {{ applyForm.businessList.length }} / 4
          </view>
        </view>
        <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
            <view
              v-for="(business, index) in applyForm.businessList"
              :key="index"
              class="bg-img"
              :data-url="applyForm.businessList[index]"
              @tap="viewBusinuessImg"
            >
              <image
                :src="applyForm.businessList[index]"
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
              v-if="applyForm.businessList.length<4"
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
            v-model="applyForm.supply"
            class="sm-border"
            maxlength="-1"
            placeholder="请填写关于公司补充说明"
          />
        </view>
      </view>
      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 关于推荐人
        </view>
      </view>
      <view class="cu-bar bg-white margin-top-sm solids-bottom">
        <view class="action">
          <text class="cuIcon-titles text-orange" /> 其他信息
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item text-gray">
          <text>本次创新院采取推荐制，您需要至少一位推荐人。推荐人需为知名企业家，或投资人，或学者，或未来之星校董、讲师、往届校友。请《推荐表》发送给推荐人（若您的推荐人中有未来之星校董、讲师、校友，可直接进入初试环节）</text>
        </view>
        <view class="cu-item text-gray">
          <text>推荐表</text>
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/referees.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              推荐人信息1:（姓名／公司／职位）
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="applyForm.referees[0]"
            class="sm-border"
            maxlength="-1"
            placeholder="请按照上述格式填写推荐人信息"
          />
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/college.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm text-center">
              是否接受此考勤要求
            </text>
          </view>
        </view>
        <view class="cu-item text-gray">
          <text>未来之星创新院名额宝贵，培训统一安排时间内，不接受因个人活动冲突的请假理由，如缺勤达到总课程的1/3将被劝退，您是否接受此考勤要求</text>
        </view>
        <radio-group
          class="block"
          @change="selectCheck"
        >
          <view class="cu-form-group">
            <radio
              class="blue radio margin-right-sm sm"
              :class="applyForm.check==='accept'?'checked':''"
              :checked="applyForm.check==='accept'?true:false"
              value="接受"
            />
            <p class="margin-right">
              接受
            </p>
            <radio
              class="blue radio margin-right-sm sm"
              :class="applyForm.check==='refuse'?'checked':''"
              :checked="applyForm.check==='refuse'?true:false"
              value="不接受"
            />
            <p>不接受</p>
          </view>
        </radio-group>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/applyReason.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              请简述您的申请理由(100字以内)
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="applyForm.applyReason"
            class="sm-border"
            maxlength="-1"
            placeholder="请简述您的申请理由(100字以内)"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/contribution.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left-sm">
              您能为创新院的其他学员做出哪些贡献
            </text>
          </view>
        </view>
        <view class="cu-form-group cu-item align-start">
          <textarea
            v-model="applyForm.contributions"
            class="sm-border"
            maxlength="-1"
            placeholder="请填写您能做出的贡献"
          />
        </view>
        <view class="cu-item">
          <view class="content">
            <image
              src="../../static/canal.png"
              class="png"
              mode="aspectFit"
            />
            <text class="margin-left">
              您通过何种渠道了解到“未来创新院”
            </text>
          </view>
        </view>
        <checkbox-group
          class="block"
          @change="selectCanals"
        >
          <view class="cu-form-group cu-list menu text-left">
            <view
              v-for="(canalItem, index) in canalList"
              :key="index"
              class="cu-item"
            >
              <label class="flex justify-between align-center flex-sub">
                <checkbox
                  :class="canalItem.checked?'checked':''"
                  :checked="canalItem.checked?true:false"
                  :value="canalItem.value"
                />
                <view class="flex-sub margin-left">
                  {{ canalItem.value }}
                </view>
                <input
                  v-if="canalItem.value==='其他'"
                  v-model="otherCanal"
                  placeholder="请输入您的了解渠道"
                  name="input"
                >
              </label>
            </view>
          </view>
        </checkbox-group>
      </view>
      <view class="btn-area margin-top padding">
        <button
          formType="submit"
          class="cu-btn bg-cyan shadow block"
          @tap="submitApplyForm"
        >
          提交
        </button>
      </view>
    </form>
  </view>
</template>

<script>
import { uniNumberBox } from '@dcloudio/uni-ui'
export default {
  name: 'ApplyForm',
  components: {
    uniNumberBox
  },
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
        supply: '',
        referees: [],
        check: 'accept',
        applyReason: '',
        contributions: '',
        canals: []
      },
      educationList: ['博士研究生', '硕士研究生', '本科', '专科', '其他'],
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
        }],
      otherEducation: '',
      otherPosition: '',
      financeList: ['尚未获得投资', '已完成种子/天使融资', '已完成pre-A轮融资', '已完成A轮融资', '不方便透露', '其他'],
      otherFinance: '',
      canalList: [
        {
          value: '微信朋友圈',
          checked: false
        }, {
          value: '朋友推荐',
          checked: false
        }, {
          value: '未来之星公众号：EdStars未来同学会',
          checked: false
        }, {
          value: '好未来官网',
          checked: false
        }, {
          value: '媒体报道',
          checked: false
        }, {
          value: '其他',
          checked: false
        }
      ],
      otherCanal: ''
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
    selectSetupDate (e) {
      this.applyForm.setup = e.detail.value
    },
    selectCompanyLocation (e) {
      this.applyForm.location = e.detail.value
    },
    selectStaffNum (e) {
      this.applyForm.staffNum = parseInt(e)
    },
    selectPositions (e) {
      const position = this.positionList
      const values = e.detail.value
      for (let i = 0, lenI = position.length; i < lenI; ++i) {
        position[i].checked = false
        for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (position[i].value === values[j]) {
            position[i].checked = true
            break
          }
        }
      }
      this.applyForm.positions = values
    },
    selectCompanyProfit (e) {
      this.applyForm.profitScale = parseFloat(e).toFixed(2)
    },
    selectFinance (e) {
      if (e.detail.value !== '其他') {
        this.applyForm.finance = e.detail.value
      }
    },
    selectCompanyValue (e) {
      this.applyForm.companyValue = parseFloat(e).toFixed(2)
    },
    selectBusinuessImg () {
      uni.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          if (this.applyForm.businessList !== 0) {
            this.applyForm.businessList = this.applyForm.businessList.concat(res.tempFilePaths)
          } else {
            this.applyForm.businessList = res.tempFilePaths
          }
        }
      })
    },
    viewBusinuessImg (e) {
      uni.previewImage({
        urls: this.applyForm.businessList,
        current: e.currentTarget.dataset.url
      })
    },
    delBusinuessImg (e) {
      uni.showModal({
        title: '删除图片',
        content: '确定删除这张照片？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.applyForm.businessList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    selectCheck (e) {
      if (e.detail.value === '接受') {
        this.applyForm.check = 'accpt'
      } else {
        this.applyForm.check = 'refuse'
      }
    },
    selectCanals (e) {
      const canal = this.canalList
      const values = e.detail.value
      for (let i = 0, lenI = canal.length; i < lenI; ++i) {
        canal[i].checked = false
        for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (canal[i].value === values[j]) {
            canal[i].checked = true
            break
          }
        }
      }
      this.applyForm.canals = values
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
