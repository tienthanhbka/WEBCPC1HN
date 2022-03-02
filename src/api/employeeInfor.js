
import request from '@/utils/post'
import requestT from '@/utils/requestT'
export function AcceptInforHC(data) {
  return request({
    url: 'EmployeeInfor/AcceptInforHC',
    method: 'post',
    data: data
  })
}
export function GetRecordHR(data) {
  return requestT({
    url: 'Employee/GetRecordHR',
    method: 'post',
    data: data
  })
}
export function GetPositionAll(data) {
  return request({
    url: 'EmployeeInfor/GetEmployeePositionAll',
    method: 'post',
    data: data
  })
}

export function GetEmployeeDecisionTypePosition(data) {
  return request({
    url: 'EmployeeInfor/GetEmployeeDecisionTypePosition',
    method: 'post',
    data: data
  })
}

export function GetListEmployee(data) {
  return request({
    url: 'EmployeeInfor/GetListEmployee',
    method: 'post',
    data: data
  })
}

export function GetEmployeeStatusCount(data) {
  return request({
    url: 'EmployeeInfor/GetEmployeeStatusCount',
    method: 'post',
    data: data
  })
}

export function GetListEmployee2(data) {
  return request({
    url: 'EmployeeInfor/GetListEmployee2',
    method: 'post',
    data: data
  })
}
export function GetOffice(data) {
    return request({
      url: 'EmployeeInfor/GetOffice',
      method: 'post',
      data: data
    })
  }
  export function GetPlace(data) {
    return request({
      url: 'EmployeeInfor/GetPlace',
      method: 'post',
      data: data
    })
  }
  export function GetBranch(data) {
    return request({
      url: 'EmployeeInfor/GetBranch',
      method: 'post',
      data: data
    })
  }
  export function GetPosition(data) {
    return request({
      url: 'EmployeeInfor/GetPosition',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeInforByToken(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeInforByToken',
      method: 'post',
      data: data
    })
  }
  export function GetEmployeeInforByID(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeInforByID',
      method: 'post',
      data: data
    })
  }
  export function UpdateInfor(data) {
    return request({
      url: 'EmployeeInfor/UpdateInfor',
      method: 'post',
      data: data
    })
  }
  export function UpdateInforHC(data) {
    return request({
      url: 'EmployeeInfor/UpdateInforHC',
      method: 'post',
      data: data
    })
  }
  export function CreateInforRelative(data) {
    return request({
      url: 'EmployeeInfor/CreateInforRelative',
      method: 'post',
      data: data
    })
  }
export function UpdateInforRelative(data) {
  return request({
    url: 'EmployeeInfor/UpdateInforRelative',
    method: 'post',
    data: data
  })
}
export function DelInforRelative(data) {
  return request({
    url: 'EmployeeInfor/DelInforRelative',
    method: 'post',
    data: data
  })
}

export function GetHDLD(data) {
  return request({
    url: 'EmployeeInfor/GetHDLD',
    method: 'post',
    data: data
  })
}
export function CreateEmployeeDecision(data) {
    return request({
      url: 'EmployeeInfor/CreateEmployeeDecision',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeDecision(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeDecision',
      method: 'post',
      data: data
    })
  }

  export function GetDecisionByID(data) {
    return request({
      url: 'EmployeeInfor/GetDecisionByID',
      method: 'post',
      data: data
    })
  }

  export function UpdateEmployeeDecision(data) {
    return request({
      url: 'EmployeeInfor/UpdateEmployeeDecision',
      method: 'post',
      data: data
    })
  }

  export function DelEmployeeDecision(data) {
    return request({
      url: 'EmployeeInfor/DelEmployeeDecision',
      method: 'post',
      data: data
    })
  }
  
  export function CreateEmployeeStatusWork(data) {
    return request({
      url: 'EmployeeInfor/CreateEmployeeStatusWork',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeStatusWork(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeStatusWork',
      method: 'post',
      data: data
    })
  }

  export function GetLstRecord_HR(data) {
    return request({
      url: 'EmployeeInfor/GetLstRecord_HR',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeRecord_HR(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeRecord_HR',
      method: 'post',
      data: data
    })
  }

  export function CreateEmployeeRecord_HR(data) {
    return request({
      url: 'EmployeeInfor/CreateEmployeeRecord_HR',
      method: 'post',
      data: data
    })
  }

  export function CreateEmployeeBHXH(data) {
    return request({
      url: 'EmployeeInfor/CreateEmployeeBHXH',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeBHXH(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeBHXH',
      method: 'post',
      data: data
    })
  }
  
  export function CreateEmployeeProcessWork(data) {
    return request({
      url: 'EmployeeInfor/CreateEmployeeProcessWork',
      method: 'post',
      data: data
    })
  }

  export function EditEmployeeProcessWork(data) {
    return request({
      url: 'EmployeeInfor/EditEmployeeProcessWork',
      method: 'post',
      data: data
    })
  }

  export function DelEmployeeProcessWork(data) {
    return request({
      url: 'EmployeeInfor/DelEmployeeProcessWork',
      method: 'post',
      data: data
    })
  }

  export function GetEmployeeProcessWork(data) {
    return request({
      url: 'EmployeeInfor/GetEmployeeProcessWork',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeDateStartByMonth(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeDateStartByMonth',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeDateEndByMonth(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeDateEndByMonth',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeBirthDayByMonth(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeBirthDayByMonth',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeBHXH(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeBHXH',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeWorkProcess(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeWorkProcess',
      method: 'post',
      data: data
    })
  }

  export function GetListEmployeeWorkProcess2(data) {
    return request({
      url: 'EmployeeInfor/GetListEmployeeWorkProcess2',
      method: 'post',
      data: data
    })
  }

  export function GetListDecision(data) {
    return request({
      url: 'EmployeeInfor/GetListDecision',
      method: 'post',
      data: data
    })
  }

  export function GetListChildren(data) {
    return request({
      url: 'EmployeeInfor/GetListChildren',
      method: 'post',
      data: data
    })
  }

  export function EditEmployeeStatusWork(data) {
    return request({
      url: 'EmployeeInfor/EditEmployeeStatusWork',
      method: 'post',
      data: data
    })
  }
  export function DelEmployeeStatusWork(data) {
    return request({
      url: 'EmployeeInfor/DelEmployeeStatusWork',
      method: 'post',
      data: data
    })
  }

  export function EditEmployeeBHXH(data) {
    return request({
      url: 'EmployeeInfor/EditEmployeeBHXH',
      method: 'post',
      data: data
    })
  }
  export function DelEmployeeBHXH(data) {
    return request({
      url: 'EmployeeInfor/DelEmployeeBHXH',
      method: 'post',
      data: data
    })
  }

  export function GetInforRelative(data) {
    return request({
      url: 'EmployeeInfor/GetInforRelative',
      method: 'post',
      data: data
    })
  }

  export function CancelInfor(data) {
    return request({
      url: 'EmployeeInfor/CancelInfor',
      method: 'post',
      data: data
    })
  }
  export function GetPayrollEm(data) {
    return requestT({
      url: 'Employee/GetPayrollEm',
      method: 'post',
      data: data
    })
  }
  