import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiUrls } from '../validators/api.constant';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {
  [x: string]: any;
  http = inject(HttpClient);

  constructor() { }
  searchProduct(key:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/products/${key}`)
  }

  searchproductbyid(id:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/${id}`)
  }
}

