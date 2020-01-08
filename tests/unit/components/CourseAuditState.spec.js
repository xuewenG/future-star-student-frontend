import { mount } from '@vue/test-utils'
import CourseAuditState from '@/components/CourseAuditState'

describe('CourseAuditState', () => {
  const wrapper = mount(CourseAuditState)
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
