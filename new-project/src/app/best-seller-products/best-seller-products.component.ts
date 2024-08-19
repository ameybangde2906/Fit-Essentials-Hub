import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-best-seller-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './best-seller-products.component.html',
  styleUrl: './best-seller-products.component.css'
})
export class BestSellerProductsComponent {
  productList: any
  show=false
  


  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.bestSellersAll().subscribe((res) => {
      this.productList = res
    })
  }

}
