export function toChineseTimeString (date) {
  return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDay() + '日'
}

export function queryParams (data, isPrefix = false) {
  isPrefix = isPrefix || false
  const prefix = isPrefix ? '?' : ''
  const _result = []
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach(_value => {
        _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }

  return _result.length ? prefix + _result.join('&') : ''
}
