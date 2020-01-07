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

  // 页面元素审查测试
  it('has the root view', () => {
    expect(wrapper.contains('view')).toBe(true)
  })
  it('has the NavTabs', () => {
    expect(wrapper.contains('.nav-tap')).toBe(true)
    const NavTabs = wrapper.findAll('.nav-tap')
    expect(NavTabs.at(0).text()).toBe('测试标签页1')
    expect(NavTabs.at(1).text()).toBe('测试标签页2')
  })

  // tab事件交互响应测试
  it('tap should change the tabcur', () => {
    expect(wrapper.vm.TabCur).toBe(0)
    const NavTabs = wrapper.findAll('.nav-tap')
    NavTabs.at(1).trigger('tap')
    expect(wrapper.vm.TabCur).toBe(1)
  })
})
