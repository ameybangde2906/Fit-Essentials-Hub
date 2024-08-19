import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsService } from '../services/get-all-products.service';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,RouterModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent implements OnInit{

  faIndianRupeeSign = faIndianRupeeSign
  relatedProducts: any
  show=false
  constructor(private activatedRoute: ActivatedRoute, private getAllproducts: GetAllProductsService, private router:Router) { }

  ngOnInit() {
    this.relatedPro()
  }
  relatedPro(){
    // let productType = this.activatedRoute.snapshot.paramMap.get('type');
    // let productId = this.activatedRoute.snapshot.paramMap.get('id')
    // productType && productId && this.getAllproducts.getRelatedProducts(productType, productId).subscribe((res) => {
    //   this.relatedProducts = res
    //   this.relatedProducts= this.relatedProducts.slice(0, 6);
    //   if(res.length>0){
    //     this.show=true
    //   }
    // })
    this.activatedRoute.params.subscribe(params => {
      const type = params['type'];
      const id=params['id']

      this.getAllproducts.getRelatedProducts(type,id)
        .subscribe(res => {
          this.relatedProducts = res;
          this.relatedProducts = this.relatedProducts.slice(0, 6);
          if (res.length>0) {
                  this.show=true
          }

        })
    })

  }
  select(id:string,type:string){
    this.router.navigate([`details/${id}/${type}`])
    window.scrollTo({top:0, behavior:"auto"})
    this.relatedPro()
  }
}
