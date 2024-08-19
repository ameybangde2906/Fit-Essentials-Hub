import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { SearchProductService } from '../services/search-product.service';

@Component({
  selector: 'app-searched-products',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './searched-products.component.html',
  styleUrl: './searched-products.component.css'
})
export class SearchedProductsComponent {
  public productList: any;
  faIndianRupeeSign = faIndianRupeeSign
  noResult: any

  constructor(private searchproductservice:SearchProductService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      const key = params['key']
      this.searchproductservice.searchProduct(key)
        .subscribe(res => {
          this.productList = res;
          if (!res.length) {
            this.noResult = true
          }
          else{
            this.noResult=false
          }

        })
    })
  }
}