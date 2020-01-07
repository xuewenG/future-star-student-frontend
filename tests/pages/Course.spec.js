import { mount } from '@vue/test-utils'
import Course from '@/pages/Course/Course'

describe('Course', () => {
  const wrapper = mount(Course)

  // 快照测试
  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // Vue实例挂载测试
  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
