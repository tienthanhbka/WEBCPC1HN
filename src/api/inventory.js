import request from '@/utils/requestT'
export function CheckInventoryCus(data) {
  return request({
    url: 'Inventory/CheckInventoryCus',
    method: 'post',
    data: data
  })
}