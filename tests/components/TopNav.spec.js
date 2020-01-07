import { mount } from '@vue/test-utils'
import TopNav from '@/components/TopNav'

describe('TopNav', () => {
  const wrapper = mount(TopNav)
  const vm = wrapper.vm
  wrapper.setProps({navList: [
    '测试标签页1', '测试标签页2'
  ]})
  
  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
