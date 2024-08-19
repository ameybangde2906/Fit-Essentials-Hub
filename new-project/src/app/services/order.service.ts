import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { address } from '../data-type';
import { Address } from 'cluster';
import { apiUrls } from '../validators/api.constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient)

  constructor() { }

  orderDetails(orderDetailsObj: any) {
    return this.http.post<any>(`${apiUrls.apiConstant}orders/order-data`, orderDetailsObj)
  }

  orderList() {
    let userStore = localStorage.getItem('user_id')
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`${apiUrls.apiConstant}orders/orders/${userId}`)
  }

  address() {
    let userStore = localStorage.getItem('user_id');
    let userId = userStore && JSON.parse(userStore)._id
    return this.http.get(`${apiUrls.apiConstant}address/getaddress/${userId}`)
  }

  postAddress(address: address) {
    return this.http.post<address>(`${apiUrls.apiConstant}address/address`, address)
  }

  updateAddress(id: string, data: Address) {
    return this.http.put(`${apiUrls.apiConstant}address/update/${id}`, data)
  }

  getAddByid(id: string) {
    return this.http.get<any>(`${apiUrls.apiConstant}address/getAddressbyid/${id}`)
  }

  deleteAddByid(id: string) {
    return this.http.delete<any>(`${apiUrls.apiConstant}address/delete/${id}`)
  }

  bestSellers(id:string){
    return this.http.get<any>(`${apiUrls.apiConstant}orders/bestsellers/${id}`)
  }
  bestSellersAll(){
    return this.http.get<any>(`${apiUrls.apiConstant}orders/bestsellersall`)
  }
}