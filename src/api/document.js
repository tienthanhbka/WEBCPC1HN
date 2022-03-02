import requestT from '@/utils/requestT'
export function CreateDocument(data) {
  return requestT({
    url: 'Document/CreateDocument',
    method: 'post',
    data: data
  })
}
export function UpdateDocument(data) {
    return requestT({
      url: 'Document/UpdateDocument',
      method: 'post',
      data: data
    })
  }
  export function GetDocument(data) {
    return requestT({
      url: 'Document/GetDocument',
      method: 'post',
      data: data
    })
  }
  export function GetDocumentInfo(data) {
    return requestT({
      url: 'Document/GetDocumentInfo',
      method: 'post',
      data: data
    })
  }