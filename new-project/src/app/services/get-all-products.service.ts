import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { product } from '../data-type';
import { apiUrls } from '../validators/api.constant';

@Injectable({
  providedIn: 'root'
})
export class GetAllProductsService {

  http = inject(HttpClient)
  constructor() { }

  addproductService(addproductObj: any) {
    return this.http.post<any>(`${apiUrls.apiConstant}products/addproduct`, addproductObj);
  }

  getAllproducts() {
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getById(productId: string) {
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/${productId}`)
  }

  updateProduct(productId: string, data: product) {
    return this.http.put(`${apiUrls.apiConstant}products/update/${productId}`, data)
  }

  deleteProduct(productId: string) {
    return this.http.delete<any>(`${apiUrls.apiConstant}products/delete/${productId}`)

  }

  getSuppDiscount(key:string) {
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/suppdiscount/${key}`)
  }
  getsuppTypeDiscount(key:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/supptypediscount/${key}`)
  }
  getaccTypeDiscount(key:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/acctypediscount/${key}`)
  }

  getRelatedProducts(type:string,id:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/relatedproducts/${type}/${id}`)
  }
  getProductsByType(type:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/productsbytype/${type}`)
  }
  getProductsByCategory(type:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/productsbycategory/${type}`)
  }
  getProductsByBrand(brand:string){
    return this.http.get<any[]>(`${apiUrls.apiConstant}products/getbybrands/${brand}`)
  }

  categories() {
    return [
      { category: "Weights and Barbells" },
      { category: "Machines" },
      { category: "Cardio" },
      { category: "Benches, Racks and Grips" },
      { category: "Accessories" },
      { category: "Supplements" },
    ]
  }

  types() {
    return [
      { category: "Weights and Barbells", type: "Dumbbells" },
      { category: "Weights and Barbells", type: "Barbells" },
      { category: "Weights and Barbells", type: "Plates" },
      { category: "Weights and Barbells", type: "Kettlebells" },

      { category: "Machines", type: "Cable Machines" },
      { category: "Machines", type: "Plate Loaded" },
      { category: "Machines", type: "Curl Machines" },
      { category: "Machines", type: "Strength and Multi-Jungle" },

      { category: "Cardio", type: "Treadmills" },
      { category: "Cardio", type: "Exercise Bikes" },
      { category: "Cardio", type: "Rowing Machines" },
      { category: "Cardio", type: "Ladder Step Machines" },
      { category: "Cardio", type: "Elliptical Trainers" },
      { category: "Cardio", type: "ARC Trainers" },

      { category: "Benches, Racks and Grips", type: "Benches" },
      { category: "Benches, Racks and Grips", type: "Racks" },
      { category: "Benches, Racks and Grips", type: "Grips" },

      { category: "Accessories", type: "Gloves and Wrist Straps" },
      { category: "Accessories", type: "Weightlifting Belts" },
      { category: "Accessories", type: "Resistance Bands and Skipping Ropes" },
      { category: "Accessories", type: "Gym Bags and Sacks" },
      { category: "Accessories", type: "Exercise Mats and Sling Trainer" },
      { category: "Accessories", type: "Medicine Balls and Stability Balls" },

      { category: "Supplements", type: "Protine" },
      { category: "Supplements", type: "Weight Gainer" },
      { category: "Supplements", type: "Creatine" },
      { category: "Supplements", type: "Pre-Workout" },
      { category: "Supplements", type: "BCAA" },
      { category: "Supplements", type: "Multi Vitamins and other supplements " },

    ]

  }
}
