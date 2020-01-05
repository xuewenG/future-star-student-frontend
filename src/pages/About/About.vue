<template>
  <view>
    <view
      class="margin-left content"
    >
      个人资料
    </view>
    <item-list
      :list="aboutItem"
    >
    </item-list>
  </view>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
export default {
  components: {
    ItemList
  },
  data () {
    return {
      aboutItem: [{
        id: 0,
        name: '俞昊然',
        intro: ''
      }]
    }
  }
}
</script>

<style>
</style>
