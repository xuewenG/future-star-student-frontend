import { mount } from '@vue/test-utils'
import TitleBar from '@/components/TitleBar'

describe('TitleBar', () => {
  const wrapper = mount(TitleBar)
  wrapper.setProps({
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
