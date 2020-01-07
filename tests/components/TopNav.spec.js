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

  // 页面元素审查
  it('has the root view', () => {
    expect(wrapper.contains('view')).toBe(true)
  })
  it('has the NavTabs', () => {
    expect(wrapper.contains('.nav-tap')).toBe(true)
    const NavTabs = wrapper.findAll('.nav-tap')
    expect(NavTabs.at(0).text()).toBe('测试标签页1')
    expect(NavTabs.at(1).text()).toBe('测试标签页2')
  })
})
