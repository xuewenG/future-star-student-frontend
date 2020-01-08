import { mount } from '@vue/test-utils'
import BottomBar from '@/components/BottomBar'

describe('BottomBar', () => {
  const wrapper = mount(BottomBar)
  wrapper.setProps({
    moduleList: [
      {
        key: 'apply',
        moduleName: '报名'
      }, {
        key: 'course',
        moduleName: '班课'
      }, {
        key: 'schoolmate',
        moduleName: '校友'
      }, {
        key: 'activity',
        moduleName: '活动'
      }, {
        key: 'about',
        moduleName: '我的'
      }
    ]
  })

  // 快照测试
  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // Vue实例挂载测试
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
