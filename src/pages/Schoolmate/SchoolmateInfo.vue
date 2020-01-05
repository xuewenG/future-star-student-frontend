<template>
  <view />
</template>

<script>
export default {
  name: 'SchoolmateInfo',
  data () {
    return {
      schoolmateInfo: {
        schoolmateId: '',
        name: '',
        avatar: '',
        camp: '',
        area: '',
        profession: ''
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
