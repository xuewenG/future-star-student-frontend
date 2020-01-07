import { mount } from '@vue/test-utils'
import TitleBar from '@/components/TitleBar'

describe('TitleBar', () => {
  const wrapper = mount(TitleBar)
  wrapper.setProps({
    title: 'test-title'
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
  it('has the back block and title block', () => {
    expect(wrapper.contains('block')).toBe(true)
    const blocks = wrapper.findAll('view > cu-custom > block')
    expect(blocks.length).toBe(2)
    expect(blocks.at(1).text()).toBe('test-title')
  })
})
