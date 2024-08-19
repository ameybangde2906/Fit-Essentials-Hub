import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetAllProductsService } from '../../services/get-all-products.service';

@Component({
  selector: 'app-common-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './common-component.component.html',
  styleUrl: './common-component.component.css'
})
export class CommonComponentComponent {

  productList: any
  show=false

  constructor(private activatedroute: ActivatedRoute, private getallproducts: GetAllProductsService) { }
  ngOnInit() {
    this.show=true
    this.activatedroute.params.subscribe(params => {
      const key = params['key'];
      this.getallproducts.getProductsByCategory(key).subscribe((res) => {
        this.productList = res
        this.show=false
      })
    })
  }
}
