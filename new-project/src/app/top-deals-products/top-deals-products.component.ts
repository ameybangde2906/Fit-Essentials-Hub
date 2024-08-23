import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-deals-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './top-deals-products.component.html',
  styleUrl: './top-deals-products.component.css'
})
export class TopDealsProductsComponent {

 show=false
  productList:any
  constructor(private getallproducts:GetAllProductsService , private activatedroute:ActivatedRoute){}

  ngOnInit(){
    window.scrollTo({top:0,behavior:"auto"})
    this.show=true
    let productType= this.activatedroute.snapshot.paramMap.get('key')
    productType && this.getallproducts.getProductsByType(productType).subscribe((res)=>{
      this.productList=res
      this.show=false
    })

    let productBrand=this.activatedroute.snapshot.paramMap.get('brand')
    productBrand && this.getallproducts.getProductsByBrand(productBrand).subscribe((res)=>{
      this.productList=res
      this.show=false
    })
    
    let category=this.activatedroute.snapshot.paramMap.get('category')
    category && this.getallproducts.getSuppDiscount(category).subscribe((res)=>{
      this.productList=res
      this.show=false
    })
  }

}
