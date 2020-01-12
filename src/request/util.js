export function toChineseTimeString (date) {
  return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
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

export function toLocalStudentData (student) {
  if (student.name) {
    return {
      baseInfo: {
        name: student.name,
        sex: student.gender,
        birthDate: student.birthday,
        tel: student.phone_number,
        mail: student.email,
        city: student.city.split('|')
      },
      educationInfo: {
        education: student.education,
        graduation: student.school,
        career: '2004-2008' + '/' + student.previous_company + '/' + student.previous_position,
        profession: student.profession
      },
      companyInfo: {
        companyBrand: student.company.name,
        website: student.company.website,
        appName: student.company.wx_public,
        setup: student.company.create_time,
        location: student.company.city,
        staffNum: student.company.number_employee,
        positions: student.company.position,
        companyInfo: student.company.introduction,
        operationData: student.company.company_data,
        profitScale: student.company.income_scale,
        finance: student.company.financing_situation,
        financeDetails: '',
        companyValue: student.company.value_of_assessment,
        businessList: [],
        supply: ''
      }
    }
  }
}

export function toRemoteStudentData (student) {
  return {
    name: student.baseInfo.name,
    birthday: student.baseInfo.birthDate,
    phone_number: student.baseInfo.tel,
    wx: student.baseInfo.wx,
    email: student.baseInfo.mail,
    city: student.baseInfo.city,
    school: student.educationInfo.graduation,
    previous_company: student.educationInfo.career.split('/')[1],
    profession: student.educationInfo.profession,
    education: student.educationInfo.education,
    previous_position: student.educationInfo.career.split('/')[2],
    gender: student.baseInfo.sex,
    company: {
      name: student.companyInfo.companyBrand,
      website: student.companyInfo.website,
      wx_public: student.companyInfo.appName,
      create_time: student.companyInfo.setup,
      city: student.companyInfo.location,
      number_employee: student.companyInfo.staffNum,
      position: student.companyInfo.positions,
      introduction: student.companyInfo.companyInfo,
      company_data: student.companyInfo.operationData,
      income_scale: student.companyInfo.profitScale,
      value_of_assessment: student.companyInfo.companyValue,
      financing_situation: student.companyInfo.finance
    }
  }
}
