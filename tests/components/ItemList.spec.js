import { mount } from '@vue/test-utils'
import ItemList from '@/components/ItemList'

describe('ItemList', () => {
  const wrapper = mount(ItemList)
  const testList = [{
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
  wrapper.setProps({
    list: testList
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
  it('has <view> as the number of props list', () => {
    expect(wrapper.contains('view')).toBe(true)
  })
  it('has image, intro and name', () => {
    expect(wrapper.contains('.item-image')).toBe(true)
    expect(wrapper.contains('.item-name')).toBe(true)
    expect(wrapper.contains('.item-intro')).toBe(true)
    const image = wrapper.findAll('.item-image')
    const name = wrapper.findAll('.item-name')
    const intro = wrapper.findAll('.item-intro')
    expect(image.length).toBe(testList.length)
    expect(name.length).toBe(testList.length)
    expect(intro.length).toBe(testList.length)
    for (let i = 0; i < testList.length; i++) {
      console.log(image.at(i).attributes('style'))
      expect(image.at(i).attributes('style')).toBe('background-image: url(' + testList[i].img + ');')
      expect(name.at(i).text()).toBe(testList[i].name)
      expect(intro.at(i).text()).toBe(testList[i].intro)
    }
  })
})
