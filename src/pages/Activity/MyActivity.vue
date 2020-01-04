<template>
  <view>
    <uni-collapse
      :accordion="true"
    >
      <uni-collapse-item
        :open="true"
        :show-animation="true"
        title="正在进行"
      >
        <item-list
          :list="ongoingActivityList"
        />
      </uni-collapse-item>

      <uni-collapse-item
        :show-animation="true"
        title="已经结束"
      >
        <item-list
          :list="finishedActivityList"
        />
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script>
import { uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui'
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    uniCollapse,
    uniCollapseItem,
    ItemList
  },
  data () {
    return {
      ongoingActivityList: [
        {
          id: 111,
          img: '../static/EdStarsLogo.png',
          name: '正在进行的校友活动1',
          intro: '正在进行'
        }, {
          id: 222,
          img: '../static/EdStarsLogo.png',
          name: '正在进行的校友活动2',
          intro: '正在进行'
        }, {
          id: 333,
          img: '../static/EdStarsLogo.png',
          name: '正在进行的校友活动3',
          intro: '正在进行'
        }
      ],
      finishedActivityList: [
        {
          id: 110,
          img: '../static/EdStarsLogo.png',
          name: '已经结束的校友活动1',
          intro: '已经结束'
        }, {
          id: 220,
          img: '../static/EdStarsLogo.png',
          name: '已经结束的校友活动2',
          intro: '已经结束'
        }, {
          id: 330,
          img: '../static/EdStarsLogo.png',
          name: '已经结束的校友活动3',
          intro: '已经结束'
        }
      ]
    }
  }
}
</script>

<style>
</style>
