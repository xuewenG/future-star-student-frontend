import { mount } from '@vue/test-utils'
import TopNav from '@/components/TopNav'

describe('TopNav', () => {
  const wrapper = mount(TopNav)
  wrapper.setProps({
    navList: [
      '测试标签页1', '测试标签页2'
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
