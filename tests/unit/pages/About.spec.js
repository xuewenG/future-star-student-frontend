import { mount } from '@vue/test-utils'
import About from '@/pages/About/About'

describe('About', () => {
  const wrapper = mount(About)

  // 快照测试
  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // Vue实例挂载测试
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
