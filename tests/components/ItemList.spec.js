import { mount } from '@vue/test-utils'
import ItemList from '@/components/ItemList'

describe('ItemList', () => {
  const wrapper = mount(ItemList)
  wrapper.setProps({
    list: [{
      id: 0,
      img: '/static/EdStarsLogo.png',
      name: '测试用例一',
      intro: '',
      url: '/pages/Course/OngoingCourse'
    }, {
      id: 1,
      img: '/static/EdStarsLogo.png',
      name: '测试用例二',
      intro: '',
      url: '/pages/Course/OngoingCourse'
    }, {
      id: 2,
      img: '/static/EdStarsLogo.png',
      name: '测试用例三',
      intro: '',
      url: '/pages/Course/OngoingCourse'
    }]
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
